import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private readonly CLASS_CLASS = 'Class';

  constructor() { }

  /**
   * Get all classes
   * @returns Observable with list of classes
   */
  getAllClasses(): Observable<any[]> {
    const query = new Parse.Query(this.CLASS_CLASS);
    query.include('institution');
    query.include('academicYear');
    query.include('teachingType');
    query.equalTo('isDeleted', false);
    query.descending('createdAt');
    
    return from(query.find()).pipe(
      map(results => results.map(classObj => this.parseClassObject(classObj)))
    );
  }

  /**
   * Get active classes
   * @returns Observable with list of active classes
   */
  getActiveClasses(): Observable<any[]> {
    const query = new Parse.Query(this.CLASS_CLASS);
    query.include('institution');
    query.include('academicYear');
    query.include('teachingType');
    query.equalTo('isDeleted', false);
    query.equalTo('isActive', true);
    query.descending('createdAt');
    
    return from(query.find()).pipe(
      map(results => results.map(classObj => this.parseClassObject(classObj)))
    );
  }

  /**
   * Get classes by institution
   * @param institutionId ID of the institution
   * @returns Observable with list of classes for the institution
   */
  getClassesByInstitution(institutionId: string): Observable<any[]> {
    const query = new Parse.Query(this.CLASS_CLASS);
    query.equalTo('institution', { __type: 'Pointer', className: 'Institution', objectId: institutionId });
    query.include('academicYear');
    query.include('teachingType');
    query.equalTo('isDeleted', false);
    query.descending('createdAt');
    
    return from(query.find()).pipe(
      map(results => results.map(classObj => this.parseClassObject(classObj)))
    );
  }

  /**
   * Get a class by ID
   * @param id Class ID
   * @returns Observable with class details
   */
  getClassById(id: string): Observable<any> {
    const query = new Parse.Query(this.CLASS_CLASS);
    query.include('institution');
    query.include('academicYear');
    query.include('teachingType');
    query.include('schedule');
    query.include('siteInstitution');
    
    return from(query.get(id)).pipe(
      map(classObj => this.parseClassObject(classObj))
    );
  }

  /**
   * Create a new class
   * @param classData Data for the new class
   * @returns Observable with the created class
   */
  createClass(classData: any): Observable<any> {
    const Class = Parse.Object.extend(this.CLASS_CLASS);
    const classObj = new Class();

    // Set basic class properties
    classObj.set('name', classData.name);
    classObj.set('maxCapacity', classData.maxCapacity);
    classObj.set('isActive', classData.isActive !== undefined ? classData.isActive : true);
    classObj.set('isDeleted', false);

    // Set institution pointer if it exists
    if (classData.institution && classData.institution.objectId) {
      const institutionPointer = {
        __type: 'Pointer',
        className: 'Institution',
        objectId: classData.institution.objectId
      };
      classObj.set('institution', institutionPointer);
    }

    // Set academic year pointer if it exists
    if (classData.academicYear && classData.academicYear.objectId) {
      const academicYearPointer = {
        __type: 'Pointer',
        className: 'AcademicYear',
        objectId: classData.academicYear.objectId
      };
      classObj.set('academicYear', academicYearPointer);
    }

    // Set teaching type pointer if it exists
    if (classData.teachingType && classData.teachingType.objectId) {
      const teachingTypePointer = {
        __type: 'Pointer',
        className: 'EducationType',
        objectId: classData.teachingType.objectId
      };
      classObj.set('teachingType', teachingTypePointer);
    }

    // Set site institution pointer if it exists
    if (classData.siteInstitution && classData.siteInstitution.objectId) {
      const sitePointer = {
        __type: 'Pointer',
        className: 'Campus',
        objectId: classData.siteInstitution.objectId
      };
      classObj.set('siteInstitution', sitePointer);
    }

    return from(classObj.save()).pipe(
      map(result => this.parseClassObject(result))
    );
  }

  /**
   * Update a class
   * @param id Class ID
   * @param classData Updated class data
   * @returns Observable with the updated class
   */
  updateClass(id: string, classData: any): Observable<any> {
    const query = new Parse.Query(this.CLASS_CLASS);
    
    return from(query.get(id)).pipe(
      map(classObj => {
        // Update class properties
        if (classData.name) {
          classObj.set('name', classData.name);
        }
        
        if (classData.maxCapacity !== undefined) {
          classObj.set('maxCapacity', classData.maxCapacity);
        }
        
        if (classData.isActive !== undefined) {
          classObj.set('isActive', classData.isActive);
        }

        // Update institution pointer if it exists
        if (classData.institution && classData.institution.objectId) {
          const institutionPointer = {
            __type: 'Pointer',
            className: 'Institution',
            objectId: classData.institution.objectId
          };
          classObj.set('institution', institutionPointer);
        }

        // Update academic year pointer if it exists
        if (classData.academicYear && classData.academicYear.objectId) {
          const academicYearPointer = {
            __type: 'Pointer',
            className: 'AcademicYear',
            objectId: classData.academicYear.objectId
          };
          classObj.set('academicYear', academicYearPointer);
        }

        // Update teaching type pointer if it exists
        if (classData.teachingType && classData.teachingType.objectId) {
          const teachingTypePointer = {
            __type: 'Pointer',
            className: 'EducationType',
            objectId: classData.teachingType.objectId
          };
          classObj.set('teachingType', teachingTypePointer);
        }

        // Update site institution pointer if it exists
        if (classData.siteInstitution && classData.siteInstitution.objectId) {
          const sitePointer = {
            __type: 'Pointer',
            className: 'Campus',
            objectId: classData.siteInstitution.objectId
          };
          classObj.set('siteInstitution', sitePointer);
        }

        // Save and return the updated class
        return from(classObj.save()).pipe(
          map(result => this.parseClassObject(result))
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
   * Delete a class (soft delete)
   * @param id Class ID
   * @returns Observable with success status
   */
  deleteClass(id: string): Observable<boolean> {
    const query = new Parse.Query(this.CLASS_CLASS);
    
    return from(query.get(id)).pipe(
      map(classObj => {
        classObj.set('isDeleted', true);
        classObj.set('isActive', false);
        return from(classObj.save());
      }),
      // Flatten the observable
      map(obs => from(obs)),
      // Convert to a simple observable
      obs => from(obs).pipe(
        map(() => true)
      )
    );
  }

  /**
   * Toggle class active status
   * @param id Class ID
   * @returns Observable with the updated class
   */
  toggleClassStatus(id: string): Observable<any> {
    const query = new Parse.Query(this.CLASS_CLASS);
    
    return from(query.get(id)).pipe(
      map(classObj => {
        const currentStatus = classObj.get('isActive');
        classObj.set('isActive', !currentStatus);
        
        return from(classObj.save()).pipe(
          map(result => this.parseClassObject(result))
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
   * Get class students count
   * @param id Class ID
   * @returns Observable with student count
   */
  getClassStudentsCount(id: string): Observable<number> {
    const query = new Parse.Query('Student');
    query.equalTo('class', { __type: 'Pointer', className: 'Class', objectId: id });
    
    return from(query.count());
  }

  /**
   * Parse a class object from Parse to a plain JS object
   * @param classObj Parse class object
   * @returns Plain JS object with class data
   */
  private parseClassObject(classObj: any): any {
    const result: any = {
      id: classObj.id,
      objectId: classObj.id,
      name: classObj.get('name'),
      maxCapacity: classObj.get('maxCapacity'),
      isActive: classObj.get('isActive'),
      isDeleted: classObj.get('isDeleted'),
      createdAt: classObj.get('createdAt'),
      updatedAt: classObj.get('updatedAt')
    };

    // Add institution data if available
    const institution = classObj.get('institution');
    if (institution) {
      result['institution'] = {
        id: institution.id,
        objectId: institution.id,
        name: institution.get('name'),
        registrationNumber: institution.get('registrationNumber')
      };
    }

    // Add academic year data if available
    const academicYear = classObj.get('academicYear');
    if (academicYear) {
      result['academicYear'] = {
        id: academicYear.id,
        objectId: academicYear.id,
        name: academicYear.get('name'),
        startDate: academicYear.get('startDate'),
        endDate: academicYear.get('endDate')
      };
    }

    // Add teaching type data if available
    const teachingType = classObj.get('teachingType');
    if (teachingType) {
      result['teachingType'] = {
        id: teachingType.id,
        objectId: teachingType.id,
        name_fr: teachingType.get('name_fr'),
        name_en: teachingType.get('name_en'),
        slug: teachingType.get('slug')
      };
    }

    // Add site institution data if available
    const site = classObj.get('siteInstitution');
    if (site) {
      result['siteInstitution'] = {
        id: site.id,
        objectId: site.id,
        name: site.get('name'),
        address: site.get('address')
      };
    }

    return result;
  }
} 