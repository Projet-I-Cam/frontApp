import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private readonly STAFF_CLASS = 'Person';


  constructor() {}

  async loadData() {

  }

  /**
   * Get all staffs
   * @returns Observable with list of staffs
   */
  getAllStaffs(): Observable<any[]> {
    const query = new Parse.Query(this.STAFF_CLASS);
    // query.equalTo('isStaff', true);
    query.equalTo('isStudent', true);
    // query.include('parents');
    // query.include('classroom');
    query.include('gender');
    // query.include('parents');
    // query.include('section');
    // query.include('enrollment');
    query.descending('createdAt');
    return from(query.find()).pipe(
      map(results => results.map(staff => this.parseStaffObject(staff)))
    );
  }

  /**
   * Get a staff by ID
   * @param id Staff ID
   * @returns Observable with staff details
   */
  getStaffById(id: string): Observable<any> {
    const query = new Parse.Query(this.STAFF_CLASS);
    query.include('person');
    // query.include('class');
    query.include('enrollment');
    return from(query.get(id)).pipe(
      map(staff => this.parseStaffObject(staff))
    );
  }

  /**
   * Create a new staff
   * @param staffData Data for the new staff
   * @returns Observable with the created staff
   */
  createStaff(staffData: any): Observable<any> {
    const Staff = Parse.Object.extend(this.STAFF_CLASS);
    const staff = new Staff();

    // Set person pointer if it exists
    if (staffData.person && staffData.person.objectId) {
      const personPointer = {
        __type: 'Pointer',
        className: 'Person',
        objectId: staffData.person.objectId
      };
      staff.set('person', personPointer);
    }

    // Set class pointer if it exists
    if (staffData.class && staffData.class.objectId) {
      const classPointer = {
        __type: 'Pointer',
        className: 'Class',
        objectId: staffData.class.objectId
      };
      staff.set('class', classPointer);
    }

    // Set enrollment pointer if it exists
    if (staffData.enrollment && staffData.enrollment.objectId) {
      const enrollmentPointer = {
        __type: 'Pointer',
        className: 'Enrollment',
        objectId: staffData.enrollment.objectId
      };
      staff.set('enrollment', enrollmentPointer);
    }

    // Set other staff properties
    staff.set('registrationNumber', staffData.registrationNumber);
    staff.set('status', staff.status || 'Active');
    staff.set('joinDate', staffData.joinDate ? new Date(staffData.joinDate) : new Date());

    if (staffData.additionalInfo) {
      staff.set('additionalInfo', staffData.additionalInfo);
    }
    return from(staff.save()).pipe(
      map(result => this.parseStaffObject(result))
    );
  }

  /**
   * Update a staff
   * @param id Staff ID
   * @param staffData Updated staff data
   * @returns Observable with the updated staff
   */
  updateStaff(id: string, staffData: any): Observable<any> {
    const query = new Parse.Query(this.STAFF_CLASS);

    return from(query.get(id)).pipe(
      map(staff => {
        // Update class if provided
        if (staffData.class && staffData.class.objectId) {
          const classPointer = {
            __type: 'Pointer',
            className: 'Class',
            objectId: staffData.class.objectId
          };
          staff.set('class', classPointer);
        }

        // Update enrollment if provided
        if (staffData.enrollment && staffData.enrollment.objectId) {
          const enrollmentPointer = {
            __type: 'Pointer',
            className: 'Enrollment',
            objectId: staffData.enrollment.objectId
          };
          staff.set('enrollment', enrollmentPointer);
        }

        // Update other properties
        if (staffData.registrationNumber) {
          staff.set('registrationNumber', staffData.registrationNumber);
        }

        if (staffData.status) {
          staff.set('status', staffData.status);
        }

        if (staffData.joinDate) {
          staff.set('joinDate', new Date(staffData.joinDate));
        }

        if (staffData.additionalInfo) {
          staff.set('additionalInfo', staffData.additionalInfo);
        }

        // Save and return the updated staff
        return from(staff.save()).pipe(
          map(result => this.parseStaffObject(result))
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
   * Delete a staff
   * @param id Staff ID
   * @returns Observable with success status
   */
  deleteStaff(id: string): Observable<boolean> {
    const query = new Parse.Query(this.STAFF_CLASS);

    return from(query.get(id)).pipe(
      map(staff => from(staff.destroy())),
      // Flatten the observable
      obs => from(obs).pipe(
        map(() => true)
      )
    );
  }


  /**
   * Parse a staff object from Parse to a plain JS object
   * @param staff Parse staff object
   * @returns Plain JS object with staff data
   */
  private parseStaffObject(staff: any): any {
    const result: any = {
      id: staff.id,
      objectId: staff.id,
      registrationNumber: staff.get('registrationNumber'),
      status: staff.get('status'),
      joinDate: staff.get('joinDate'),
      additionalInfo: staff.get('additionalInfo'),
      createdAt: staff.get('createdAt'),
      updatedAt: staff.get('updatedAt'),
      ...staff?.toJSON()
    };
    return result;
  }


}
