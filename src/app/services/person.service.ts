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
    query.include('classroom');
    query.include('gender');
    query.include('parents');
    query.include('section');
    query.include('enrollment');
    return from(query.get(id)).pipe(
      map(person => this.parsePersonObject(person))
    );
  }

  /**
   * Create a new person
   * @param personData Data for the new person
   * @returns Observable with the created person
   */
  async createSimpleParent(parents: Array<any>): Promise<any> {
    const toReturn = []
    for (let index = 0; index < parents.length; index++) {
      const parent = parents[index];
      if(parent.LinkExistedParent){
        toReturn.push({
          "__type": "Pointer", 
          "className": "Person" , 
          "objectId": parent.fatherObjectId
        })
        continue
      }
      const usr = new Parse.User();
      usr.set("username", parent.phoneNumber);
      usr.set("password", parent.phoneNumber);
      const dataRole = await Parse.Cloud.run('getRole', {task_name: "parent"})
      console.log('Role round ', dataRole)
      usr.set("role", {"__type": "Pointer", "className": "_Role" , "objectId": dataRole.role?.objectId});
      const user = await usr.signUp()

      const Person = Parse.Object.extend(this.PERSON_CLASS);
      const query = new Person();
      query.set("firstName", parent?.firstName)
      query.set("lastName", parent?.lastName)
      query.set("gender", {"__type": "Pointer", "className": "Gender" , "objectId": parent.gender})
      query.set("isParent", true)
      query.set("phone", parent?.phoneNumber)
      query.set("email", parent?.email)
      query.set("user", user)
      const person = await query.save()
      toReturn.push(person)
    }
    return toReturn
  }
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
    if(personData?.parents){
      person.set('parents', personData.parents);
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
      map(async result => { 
        const usr = new Parse.User();
        usr.set("username", personData.phone);
        usr.set("password", personData.phone);
        if(personData?.isStudent){
          const dataRole = await Parse.Cloud.run('getRole', {task_name: "eleve"})
          usr.set("role", {"__type": "Pointer", "className": "_Role" , "objectId": dataRole.role?.objectId});
        }
        return  usr.signUp().then(() => {
          person.set("user", usr)
          return person.save().then(()=>this.parsePersonObject(result))
        })
      })
    );
  }

  async searchParentByKeyword(q: string): Promise<any> {
    try {
      const queries = ['firstName', 'lastName', 'phone', 'email'].map(field => {
        const qObj = new Parse.Query(this.PERSON_CLASS);
        qObj.equalTo('isParent', true);
        qObj.matches(field, new RegExp(q, 'i'));
        return qObj;
      });
      const mainQuery = Parse.Query.or(...queries);
      mainQuery.limit(30);
      mainQuery.select('firstName', 'lastName', 'email', 'phone');
      const results = await mainQuery.find();
      return results.map(person => ({
        label: `${person.get("firstName")} ${person.get("lastName")} - ${person.get("phone")}`,
        value: person.id
      }));
    } catch (error) {
      console.error(' error searchParentByKeyword', error)
      return []
    }
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