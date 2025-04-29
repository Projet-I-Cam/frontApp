import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { from, Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly STUDENT_CLASS = 'Person';

  constructor() { }

  /** 
   * Get all students
   * @returns Observable with list of students
   */
  getAllStudents(): Observable<any[]> {
    const query = new Parse.Query(this.STUDENT_CLASS);
    query.equalTo('isStudent', true);
    // query.include('parents');
    query.include('class');
    query.include('gender');
    query.include('section');
    query.include('enrollment');
    query.descending('createdAt');
    return from(query.find()).pipe(
      map(results => results.map(student => this.parseStudentObject(student)))
    );
  }

  /**
   * Get students by class
   * @param classId ID of the class
   * @returns Observable with list of students in the class
   */
  getStudentsByClass(classId: string): Observable<any[]> {
    const query = new Parse.Query(this.STUDENT_CLASS);
    query.equalTo('class', { __type: 'Pointer', className: 'Class', objectId: classId });
    query.include('person');
    query.include('enrollment');
    return from(query.find()).pipe(
      map(results => results.map(student => this.parseStudentObject(student)))
    );
  }

  /**
   * Get a student by ID
   * @param id Student ID
   * @returns Observable with student details
   */
  getStudentById(id: string): Observable<any> {
    const query = new Parse.Query(this.STUDENT_CLASS);
    query.include('person');
    query.include('class');
    query.include('enrollment');
    return from(query.get(id)).pipe(
      map(student => this.parseStudentObject(student))
    );
  }

  /**
   * Create a new student
   * @param studentData Data for the new student
   * @returns Observable with the created student
   */
  createStudent(studentData: any): Observable<any> {
    const Student = Parse.Object.extend(this.STUDENT_CLASS);
    const student = new Student();

    // Set person pointer if it exists
    if (studentData.person && studentData.person.objectId) {
      const personPointer = {
        __type: 'Pointer',
        className: 'Person',
        objectId: studentData.person.objectId
      };
      student.set('person', personPointer);
    }

    // Set class pointer if it exists
    if (studentData.class && studentData.class.objectId) {
      const classPointer = {
        __type: 'Pointer',
        className: 'Class',
        objectId: studentData.class.objectId
      };
      student.set('class', classPointer);
    }

    // Set enrollment pointer if it exists
    if (studentData.enrollment && studentData.enrollment.objectId) {
      const enrollmentPointer = {
        __type: 'Pointer',
        className: 'Enrollment',
        objectId: studentData.enrollment.objectId
      };
      student.set('enrollment', enrollmentPointer);
    }

    // Set other student properties
    student.set('registrationNumber', studentData.registrationNumber);
    student.set('status', studentData.status || 'Active');
    student.set('joinDate', studentData.joinDate ? new Date(studentData.joinDate) : new Date());
    
    if (studentData.additionalInfo) {
      student.set('additionalInfo', studentData.additionalInfo);
    }

    return from(student.save()).pipe(
      map(result => this.parseStudentObject(result))
    );
  }

  /**
   * Update a student
   * @param id Student ID
   * @param studentData Updated student data
   * @returns Observable with the updated student
   */
  updateStudent(id: string, studentData: any): Observable<any> {
    const query = new Parse.Query(this.STUDENT_CLASS);
    
    return from(query.get(id)).pipe(
      map(student => {
        // Update class if provided
        if (studentData.class && studentData.class.objectId) {
          const classPointer = {
            __type: 'Pointer',
            className: 'Class',
            objectId: studentData.class.objectId
          };
          student.set('class', classPointer);
        }

        // Update enrollment if provided
        if (studentData.enrollment && studentData.enrollment.objectId) {
          const enrollmentPointer = {
            __type: 'Pointer',
            className: 'Enrollment',
            objectId: studentData.enrollment.objectId
          };
          student.set('enrollment', enrollmentPointer);
        }

        // Update other properties
        if (studentData.registrationNumber) {
          student.set('registrationNumber', studentData.registrationNumber);
        }
        
        if (studentData.status) {
          student.set('status', studentData.status);
        }
        
        if (studentData.joinDate) {
          student.set('joinDate', new Date(studentData.joinDate));
        }
        
        if (studentData.additionalInfo) {
          student.set('additionalInfo', studentData.additionalInfo);
        }

        // Save and return the updated student
        return from(student.save()).pipe(
          map(result => this.parseStudentObject(result))
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
   * Delete a student
   * @param id Student ID
   * @returns Observable with success status
   */
  deleteStudent(id: string): Observable<boolean> {
    const query = new Parse.Query(this.STUDENT_CLASS);
    
    return from(query.get(id)).pipe(
      map(student => from(student.destroy())),
      // Flatten the observable
      obs => from(obs).pipe(
        map(() => true)
      )
    );
  }

  /**
   * Transfer a student to another class
   * @param studentId Student ID
   * @param newClassId New Class ID
   * @param reason Reason for transfer
   * @returns Observable with updated student
   */
  transferStudent(studentId: string, newClassId: string, reason: string): Observable<any> {
    const query = new Parse.Query(this.STUDENT_CLASS);
    
    return from(query.get(studentId)).pipe(
      map(student => {
        // Create transfer record
        const Transfer = Parse.Object.extend('Transfer');
        const transfer = new Transfer();
        
        transfer.set('student', student);
        transfer.set('fromClass', student.get('class'));
        
        const newClassPointer = {
          __type: 'Pointer',
          className: 'Class',
          objectId: newClassId
        };
        
        transfer.set('toClass', newClassPointer);
        transfer.set('reason', reason);
        transfer.set('date', new Date());
        
        // Save transfer and update student's class
        return from(transfer.save()).pipe(
          map(() => {
            student.set('class', newClassPointer);
            return from(student.save());
          }),
          map(updatedStudent => this.parseStudentObject(updatedStudent))
        );
      }),
      // Flatten the observable
      obs => from(obs).pipe(
        map(val => val)
      )
    );
  }

  /**
   * Parse a student object from Parse to a plain JS object
   * @param student Parse student object
   * @returns Plain JS object with student data
   */
  private parseStudentObject(student: any): any {
    const result: any = {
      id: student.id,
      objectId: student.id,
      registrationNumber: student.get('registrationNumber'),
      status: student.get('status'),
      joinDate: student.get('joinDate'),
      additionalInfo: student.get('additionalInfo'),
      createdAt: student.get('createdAt'),
      updatedAt: student.get('updatedAt'),
      ...student?.toJSON()
    };

    // Add person data if available
    const person = student.get('person');
    if (person) {
      result['person'] = {
        id: person.id,
        objectId: person.id,
        firstName: person.get('firstName'),
        lastName: person.get('lastName'),
        gender: person.get('gender'),
        dateOfBirth: person.get('dateOfBirth'),
        placeOfBirth: person.get('placeOfBirth'),
        email: person.get('email'),
        phone: person.get('phone'),
        address: person.get('address'),
        photo: person.get('photo') ? person.get('photo').url() : null
      };
    }

    // Add class data if available
    const classObj = student.get('class');
    if (classObj) {
      result['class'] = {
        id: classObj.id,
        objectId: classObj.id,
        name: classObj.get('name'),
        maxCapacity: classObj.get('maxCapacity')
      };
    }

    // Add enrollment data if available
    const enrollment = student.get('enrollment');
    if (enrollment) {
      result['enrollment'] = {
        id: enrollment.id,
        objectId: enrollment.id,
        enrollmentDate: enrollment.get('enrollmentDate'),
        isValid: enrollment.get('isValid'),
        validationDate: enrollment.get('validationDate')
      };
    }

    return result;
  }
} 