import { Injectable } from '@angular/core';
import ParseClass from '../parseClass';
import Parse from 'parse';

@Injectable({
  providedIn: 'root' // This makes the service available throughout the application
})
export class UtilsService {
  
  constructor() {}

  public getMaxDate(limit: number): string {
    const today = new Date();
    const maxDate = new Date(today.setFullYear(today.getFullYear() - limit));
    return maxDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }

  public countryCodes = [
    { code: '+237', name: 'CMR' },
    { code: '+1', name: 'USA' },
    { code: '+33', name: 'France' },
    { code: '+44', name: 'UK' },
    { code: '+49', name: 'Germany' },
    { code: '+91', name: 'India' },
    // Add more country codes as needed
  ];

  public emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

<<<<<<< HEAD
  static async getSection(){
    return (await new Parse.Query(ParseClass.Section).find()) //?.map(section => section.toJSON())
  }
  static async getGender(){
    return (await new Parse.Query(ParseClass.Gender).find()) //?.map(section => section.toJSON())
  }
  static getStudentMatricule(){
    return "123456789"
  }
=======
>>>>>>> 337f70a2e2d5e464434a51d3756e76fb96a4869f

}