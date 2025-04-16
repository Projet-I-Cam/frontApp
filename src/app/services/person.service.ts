import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly PERSON_CLASS = 'Person';

  constructor() { }

  /**
   * Get all persons
   * @returns Observable with list of persons
   */
  getAllPersons(): Observable<any[]> {
    const query = new Parse.Query(this.PERSON_CLASS);
    query.descending('createdAt');
    return from(query.find()).pipe(
      map(results => results.map(person => this.parsePersonObject(person)))
    );
  }

  /**
   * Get a person by ID
   * @param id Person ID
   * @returns Observable with person details
   */
  getPersonById(id: string): Observable<any> {
    const query = new Parse.Query(this.PERSON_CLASS);
    return from(query.get(id)).pipe(
      map(person => this.parsePersonObject(person))
    );
  }

  /**
   * Create a new person
   * @param personData Data for the new person
   * @returns Observable with the created person
   */
  createPerson(personData: any): Observable<any> {
    const Person = Parse.Object.extend(this.PERSON_CLASS);
    const person = new Person();

    // Set basic person properties
    person.set('firstName', personData.firstName);
    person.set('lastName', personData.lastName);
    person.set('gender', {"__type": "Pointer", "className": "Gender" , "objectId": personData.gender});
    person.set('section', {"__type": "Pointer", "className": "Section" , "objectId": personData.section});

    person.set('birthDate', personData.dateOfBirth ? new Date(personData.dateOfBirth) : null);
    person.set('birthPlace', personData.placeOfBirth);
    person.set('email', personData.email);
    person.set('phone', personData.phone);
    person.set('registrationNumber', personData.registrationNumber);
    // person.set('address', personData.address);
    if(personData?.isStudent){
      person.set('isStudent', true);
    }
    if(personData?.isParent){
      person.set('isParent', true);
    }
    if(personData?.isStaff){
      person.set('isStaff', true);
    }
    
    // Handle file upload if photo is provided
    if (personData.photo && personData.photo instanceof File) {
      const photoFile = new Parse.File(personData.photo.name, personData.photo);
      person.set('photo', photoFile);
    }

    return from(person.save()).pipe(
      map(result => { 
        const usr = new Parse.User();
        usr.set("username", personData.phone);
        usr.set("password", personData.phone);
        usr.set("person", person);
        if(personData.roleId){
          usr.set("role", {"__type": "Pointer", "className": "_Role" , "objectId": personData.roleId});
        }
        return  usr.signUp().then(user => {
          person.set("user", usr)
          return this.parsePersonObject(result)
        })
      })
    );
  }

  /**
   * Update a person
   * @param id Person ID
   * @param personData Updated person data
   * @returns Observable with the updated person
   */
  updatePerson(id: string, personData: any): Observable<any> {
    const query = new Parse.Query(this.PERSON_CLASS);
    
    return from(query.get(id)).pipe(
      map(person => {
        // Update person properties
        if (personData.firstName) {
          person.set('firstName', personData.firstName);
        }
        
        if (personData.lastName) {
          person.set('lastName', personData.lastName);
        }
        
        if (personData.gender) {
          person.set('gender', personData.gender);
        }
        
        if (personData.dateOfBirth) {
          person.set('dateOfBirth', new Date(personData.dateOfBirth));
        }
        
        if (personData.placeOfBirth) {
          person.set('placeOfBirth', personData.placeOfBirth);
        }
        
        if (personData.email) {
          person.set('email', personData.email);
        }
        
        if (personData.phone) {
          person.set('phone', personData.phone);
        }
        
        if (personData.address) {
          person.set('address', personData.address);
        }
        
        // Handle file upload if photo is provided
        if (personData.photo && personData.photo instanceof File) {
          const photoFile = new Parse.File(personData.photo.name, personData.photo);
          person.set('photo', photoFile);
        }

        // Save and return the updated person
        return from(person.save()).pipe(
          map(result => this.parsePersonObject(result))
        );
      }),
      // Flatten the observable
      map(obs => from(obs)),
      // Convert to a simple observable
      obs => from(obs).pipe(
        map(val => val)
      )
    );
  }

  /**
   * Delete a person
   * @param id Person ID
   * @returns Observable with success status
   */
  deletePerson(id: string): Observable<boolean> {
    const query = new Parse.Query(this.PERSON_CLASS);
    
    return from(query.get(id)).pipe(
      map(person => from(person.destroy())),
      // Flatten the observable
      obs => from(obs).pipe(
        map(() => true)
      )
    );
  }

  /**
   * Search persons by name
   * @param searchTerm Search term
   * @returns Observable with list of matching persons
   */
  searchPersons(searchTerm: string): Observable<any[]> {
    const firstNameQuery = new Parse.Query(this.PERSON_CLASS);
    firstNameQuery.contains('firstName', searchTerm);
    
    const lastNameQuery = new Parse.Query(this.PERSON_CLASS);
    lastNameQuery.contains('lastName', searchTerm);
    
    const mainQuery = Parse.Query.or(firstNameQuery, lastNameQuery);
    
    return from(mainQuery.find()).pipe(
      map(results => results.map(person => this.parsePersonObject(person)))
    );
  }

  /**
   * Parse a person object from Parse to a plain JS object
   * @param person Parse person object
   * @returns Plain JS object with person data
   */
  private parsePersonObject(person: any): any {
    return {
      id: person.id,
      objectId: person.id,
      firstName: person.get('firstName'),
      lastName: person.get('lastName'),
      fullName: `${person.get('firstName')} ${person.get('lastName')}`,
      gender: person.get('gender'),
      dateOfBirth: person.get('dateOfBirth'),
      placeOfBirth: person.get('placeOfBirth'),
      email: person.get('email'),
      phone: person.get('phone'),
      address: person.get('address'),
      photo: person.get('photo') ? person.get('photo').url() : null,
      createdAt: person.get('createdAt'),
      updatedAt: person.get('updatedAt'),
      ...person.toJSON()
    };
  }
} 