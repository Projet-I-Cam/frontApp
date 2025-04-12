import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
  private readonly INSTITUTION_CLASS = 'Institution';

  constructor() { }

  /**
   * Get all institutions
   * @returns Observable with list of institutions
   */
  getAllInstitutions(): Observable<any[]> {
    const query = new Parse.Query(this.INSTITUTION_CLASS);
    query.include('campuses');
    query.descending('createdAt');
    return from(query.find()).pipe(
      map((results: any) => {
        return results.map((r: any) => r?.toJSON())
      })
    );
  }

  /**
   * Get active institutions
   * @returns Observable with list of active institutions
   */
  getActiveInstitutions(): Observable<any[]> {
    const query = new Parse.Query(this.INSTITUTION_CLASS);
    query.include('campuses');
    query.equalTo('isActive', true);
    query.descending('createdAt');
    return from(query.find()).pipe(
      map(results => results.map((r: any) => r?.toJSON()))
    );
  }

  /**
   * Get an institution by ID
   * @param id Institution ID
   * @returns Observable with institution details
   */
  getInstitutionById(id: string): Observable<any> {
    console.log(' id id ', id)
    const query = new Parse.Query(this.INSTITUTION_CLASS);
    query.include('campuses');
    return from(query.get(id)).pipe(
      map(institution => {
        console.log(' institution institution', institution)
        return institution.toJSON()
      })
    );
  }

  /**
   * Create a new institution
   * @param institutionData Data for the new institution
   * @returns Observable with the created institution
   */
  createInstitution(institutionData: any): Observable<any> {
    const Institution = Parse.Object.extend(this.INSTITUTION_CLASS);
    const institution = new Institution();

    // Set basic properties
    institution.set('name', institutionData.name);
    institution.set('registrationNumber', institutionData.registrationNumber);
    institution.set('motto', institutionData.motto || '');
    institution.set('description', institutionData.description || '');
    institution.set('poBox', institutionData.poBox || '');
    institution.set('isActive', institutionData.isActive !== undefined ? institutionData.isActive : true);
    
    // Set emails and phones arrays
    if (institutionData.emails && Array.isArray(institutionData.emails)) {
      institution.set('emails', institutionData.emails);
    } else {
      institution.set('emails', []);
    }
    
    if (institutionData.phones && Array.isArray(institutionData.phones)) {
      institution.set('phones', institutionData.phones);
    } else {
      institution.set('phones', []);
    }

    // Set logo if provided
    if (institutionData.logo && institutionData.logo instanceof File) {
      const logoFile = new Parse.File(institutionData.logo.name, institutionData.logo);
      institution.set('logo', logoFile);
    }

    // Set campus pointer if it exists
    if (institutionData.campus && institutionData.campus.objectId) {
      const campusPointer = {
        __type: 'Pointer',
        className: 'Campus',
        objectId: institutionData.campus.objectId
      };
      institution.set('campuses', [campusPointer]);
    }

    return from(institution.save()).pipe(
      map(result => this.parseInstitutionObject(result))
    );
  }

  /**
   * Update an institution
   * @param id Institution ID
   * @param institutionData Updated institution data
   * @returns Observable with the updated institution
   */
  updateInstitution(id: string, institutionData: any): Observable<any> {
    const query = new Parse.Query(this.INSTITUTION_CLASS);
    console.log('Updating institution with data:', institutionData);
    
    return from(query.get(id)).pipe(
      map(institution => {
        // Always update all fields that are included in the data
        if (institutionData.name !== undefined) {
          institution.set('name', institutionData.name);
        }
        
        if (institutionData.registrationNumber !== undefined) {
          institution.set('registrationNumber', institutionData.registrationNumber);
        }
        
        if (institutionData.motto !== undefined) {
          institution.set('motto', institutionData.motto);
        }
        
        if (institutionData.description !== undefined) {
          institution.set('description', institutionData.description);
        }
        
        if (institutionData.poBox !== undefined) {
          institution.set('poBox', institutionData.poBox);
        }
        
        if (institutionData.isActive !== undefined) {
          institution.set('isActive', institutionData.isActive);
        }
        
        // Update emails and phones
        if (institutionData.emails !== undefined) {
          institution.set('emails', Array.isArray(institutionData.emails) ? institutionData.emails : []);
        }
        
        if (institutionData.phones !== undefined) {
          institution.set('phones', Array.isArray(institutionData.phones) ? institutionData.phones : []);
        }
        
        // Update logo if provided
        if (institutionData.logo && institutionData.logo instanceof File) {
          const logoFile = new Parse.File(institutionData.logo.name, institutionData.logo);
          institution.set('logo', logoFile);
        }
        
        // Update campus pointer if provided
        if (institutionData.campus && institutionData.campus.objectId) {
          const campusPointer = {
            __type: 'Pointer',
            className: 'Campus',
            objectId: institutionData.campus.objectId
          };
          institution.set('campuses', [campusPointer]);
        }

        console.log('About to save updated institution');
        // Save and return the updated institution
        return from(institution.save()).pipe(
          map(result => {
            console.log('Institution saved successfully');
            return this.parseInstitutionObject(result);
          })
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
   * Delete an institution
   * @param id Institution ID
   * @returns Observable with success status
   */
  deleteInstitution(id: string): Observable<boolean> {
    const query = new Parse.Query(this.INSTITUTION_CLASS);
    
    return from(query.get(id)).pipe(
      map(institution => from(institution.destroy())),
      // Flatten the observable
      map(obs => from(obs)),
      // Convert to a simple observable
      obs => from(obs).pipe(
        map(() => true)
      )
    );
  }

  /**
   * Toggle institution active status
   * @param id Institution ID
   * @returns Observable with the updated institution
   */
  toggleInstitutionStatus(id: string): Observable<any> {
    const query = new Parse.Query(this.INSTITUTION_CLASS);
    
    return from(query.get(id)).pipe(
      map(institution => {
        const currentStatus = institution.get('isActive');
        institution.set('isActive', !currentStatus);
        
        return from(institution.save()).pipe(
          map(result => this.parseInstitutionObject(result))
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
   * Parse an institution object from Parse to a plain JS object
   * @param institution Parse institution object
   * @returns Plain JS object with institution data
   */
  private parseInstitutionObject(institution: any): any {
    const result: any = {
      id: institution.id,
      objectId: institution.id,
      name: institution.get('name'),
      registrationNumber: institution.get('registrationNumber'),
      motto: institution.get('motto'),
      description: institution.get('description'),
      poBox: institution.get('poBox'),
      emails: institution.get('emails') || [],
      phones: institution.get('phones') || [],
      isActive: institution.get('isActive'),
      createdAt: institution.get('createdAt'),
      updatedAt: institution.get('updatedAt')
    };

    // Add logo URL if available
    const logo = institution.get('logo');
    if (logo) {
      result.logo = logo.url();
    }

    // Add campus data if available
    const campus = institution.get('campus');
    if (campus) {
      result.campus = {
        id: campus.id,
        objectId: campus.id,
        name: campus.get('name'),
        address: campus.get('address')
      };
    }

    return result;
  }
} 