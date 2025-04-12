import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private readonly TEACHER_CLASS = 'Teacher';

  constructor() { }

  /**
   * Get all teachers
   * @returns Observable with list of teachers
   */
  getAllTeachers(): Observable<any[]> {
    const query = new Parse.Query(this.TEACHER_CLASS);
    query.include('person');
    query.include('departments');
    query.include('subjects');
    query.descending('createdAt');
    return from(query.find()).pipe(
      map(results => results.map(teacher => this.parseTeacherObject(teacher)))
    );
  }

  /**
   * Get a teacher by ID
   * @param id Teacher ID
   * @returns Observable with teacher details
   */
  getTeacherById(id: string): Observable<any> {
    const query = new Parse.Query(this.TEACHER_CLASS);
    query.include('person');
    query.include('departments');
    query.include('subjects');
    return from(query.get(id)).pipe(
      map(teacher => this.parseTeacherObject(teacher))
    );
  }

  /**
   * Create a new teacher
   * @param teacherData Data for the new teacher
   * @returns Observable with the created teacher
   */
  createTeacher(teacherData: any): Observable<any> {
    const Teacher = Parse.Object.extend(this.TEACHER_CLASS);
    const teacher = new Teacher();

    // Set person pointer if it exists
    if (teacherData.person && teacherData.person.objectId) {
      const personPointer = {
        __type: 'Pointer',
        className: 'Person',
        objectId: teacherData.person.objectId
      };
      teacher.set('person', personPointer);
    }

    // Set departments if provided
    if (teacherData.departments && Array.isArray(teacherData.departments)) {
      const departmentPointers = teacherData.departments.map((dept: any) => ({
        __type: 'Pointer',
        className: 'Department',
        objectId: dept.objectId
      }));
      teacher.set('departments', departmentPointers);
    }

    // Set subjects if provided
    if (teacherData.subjects && Array.isArray(teacherData.subjects)) {
      const subjectPointers = teacherData.subjects.map((subj: any) => ({
        __type: 'Pointer',
        className: 'Subject',
        objectId: subj.objectId
      }));
      teacher.set('subjects', subjectPointers);
    }

    // Set other teacher properties
    teacher.set('employeeId', teacherData.employeeId);
    teacher.set('joiningDate', teacherData.joiningDate ? new Date(teacherData.joiningDate) : new Date());
    teacher.set('qualification', teacherData.qualification || '');
    teacher.set('experience', teacherData.experience || '');
    teacher.set('designation', teacherData.designation || '');
    teacher.set('isActive', teacherData.isActive !== undefined ? teacherData.isActive : true);
    
    if (teacherData.additionalInfo) {
      teacher.set('additionalInfo', teacherData.additionalInfo);
    }

    return from(teacher.save()).pipe(
      map(result => this.parseTeacherObject(result))
    );
  }

  /**
   * Update a teacher
   * @param id Teacher ID
   * @param teacherData Updated teacher data
   * @returns Observable with the updated teacher
   */
  updateTeacher(id: string, teacherData: any): Observable<any> {
    const query = new Parse.Query(this.TEACHER_CLASS);
    
    return from(query.get(id)).pipe(
      map(teacher => {
        // Update departments if provided
        if (teacherData.departments && Array.isArray(teacherData.departments)) {
          const departmentPointers = teacherData.departments.map((dept: any) => ({
            __type: 'Pointer',
            className: 'Department',
            objectId: dept.objectId
          }));
          teacher.set('departments', departmentPointers);
        }

        // Update subjects if provided
        if (teacherData.subjects && Array.isArray(teacherData.subjects)) {
          const subjectPointers = teacherData.subjects.map((subj: any) => ({
            __type: 'Pointer',
            className: 'Subject',
            objectId: subj.objectId
          }));
          teacher.set('subjects', subjectPointers);
        }

        // Update other properties
        if (teacherData.employeeId !== undefined) {
          teacher.set('employeeId', teacherData.employeeId);
        }
        
        if (teacherData.joiningDate) {
          teacher.set('joiningDate', new Date(teacherData.joiningDate));
        }
        
        if (teacherData.qualification !== undefined) {
          teacher.set('qualification', teacherData.qualification);
        }
        
        if (teacherData.experience !== undefined) {
          teacher.set('experience', teacherData.experience);
        }
        
        if (teacherData.designation !== undefined) {
          teacher.set('designation', teacherData.designation);
        }
        
        if (teacherData.isActive !== undefined) {
          teacher.set('isActive', teacherData.isActive);
        }
        
        if (teacherData.additionalInfo) {
          teacher.set('additionalInfo', teacherData.additionalInfo);
        }

        // Save and return the updated teacher
        return from(teacher.save()).pipe(
          map(result => this.parseTeacherObject(result))
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
   * Delete a teacher
   * @param id Teacher ID
   * @returns Observable with success status
   */
  deleteTeacher(id: string): Observable<boolean> {
    const query = new Parse.Query(this.TEACHER_CLASS);
    
    return from(query.get(id)).pipe(
      map(teacher => from(teacher.destroy())),
      // Flatten the observable
      obs => from(obs).pipe(
        map(() => true)
      )
    );
  }

  /**
   * Toggle teacher active status
   * @param id Teacher ID
   * @returns Observable with the updated teacher
   */
  toggleTeacherStatus(id: string): Observable<any> {
    const query = new Parse.Query(this.TEACHER_CLASS);
    
    return from(query.get(id)).pipe(
      map(teacher => {
        const currentStatus = teacher.get('isActive');
        teacher.set('isActive', !currentStatus);
        
        return from(teacher.save()).pipe(
          map(result => this.parseTeacherObject(result))
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
   * Parse a teacher object from Parse to a plain JS object
   * @param teacher Parse teacher object
   * @returns Plain JS object with teacher data
   */
  private parseTeacherObject(teacher: any): any {
    const result: any = {
      id: teacher.id,
      objectId: teacher.id,
      employeeId: teacher.get('employeeId'),
      joiningDate: teacher.get('joiningDate'),
      qualification: teacher.get('qualification'),
      experience: teacher.get('experience'),
      designation: teacher.get('designation'),
      isActive: teacher.get('isActive'),
      additionalInfo: teacher.get('additionalInfo'),
      createdAt: teacher.get('createdAt'),
      updatedAt: teacher.get('updatedAt')
    };

    // Add person data if available
    const person = teacher.get('person');
    if (person) {
      result.person = {
        id: person.id,
        objectId: person.id,
        firstName: person.get('firstName'),
        lastName: person.get('lastName'),
        email: person.get('email'),
        phone: person.get('phone'),
        gender: person.get('gender'),
        dateOfBirth: person.get('dateOfBirth')
      };

      // Add profile picture URL if available
      const profilePicture = person.get('profilePicture');
      if (profilePicture) {
        result.person.profilePicture = profilePicture.url();
      }
    }

    // Add departments data if available
    const departments = teacher.get('departments');
    if (departments && Array.isArray(departments)) {
      result.departments = departments.map((dept: any) => ({
        id: dept.id,
        objectId: dept.id,
        name: dept.get('name'),
        code: dept.get('code')
      }));
    }

    // Add subjects data if available
    const subjects = teacher.get('subjects');
    if (subjects && Array.isArray(subjects)) {
      result.subjects = subjects.map((subj: any) => ({
        id: subj.id,
        objectId: subj.id,
        name: subj.get('name'),
        code: subj.get('code')
      }));
    }

    return result;
  }
} 