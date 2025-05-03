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

  static async getSection(){
    return (await new Parse.Query(ParseClass.Section).find()) //?.map(section => section.toJSON())
  }
  static async getGender(){
    return (await new Parse.Query(ParseClass.Gender).find()) //?.map(section => section.toJSON())
  }
  static async getTypeOfFather(){
    return (await new Parse.Query(ParseClass.TypeOfParent).find()) //?.map(section => section.toJSON())
  }
  static getStudentMatricule(){
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const randomID = Math.floor(1000 + Math.random() * 9000);;
    return `ST-${year}-${randomID}`
  }

  public getDate(createdAt: any){
    var result : string = "";
    if (createdAt instanceof Date) {
      result = createdAt.toISOString();
      // Si c'est une chaîne, essayez de la convertir en Date
      const date = new Date(createdAt);
      result = isNaN(date.getTime()) ? "" : date.toISOString();
    } else {
        result = "";
    }

    return result;
  }
  static async getArrondissement(id: any): Promise<any>{
    const q = new Parse.Query(ParseClass.Municipality)
    q.limit(500)
    if(id){
      return await q.get(id)
    }
    return await q.find()
  }

}