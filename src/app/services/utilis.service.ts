import { Injectable } from '@angular/core';

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


}