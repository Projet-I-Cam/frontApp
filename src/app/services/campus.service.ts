import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class CampusService {
  private readonly CAMPUS_CLASS = 'Campus';

  constructor() { }

  /**
   * Get all campuses
   * @returns Observable with list of campuses
   */
  getAllCampuses(): Observable<any[]> {
    const query = new Parse.Query(this.CAMPUS_CLASS);
    query.include('municipality');
    query.descending('createdAt');
    return from(query.find()).pipe(
      map(results => results.map(campus => this.parseCampusObject(campus)))
    );
  }

  /**
   * Get campuses by municipality
   * @param municipalityId ID of the municipality
   * @returns Observable with list of campuses in the municipality
   */
  getCampusesByMunicipality(municipalityId: string): Observable<any[]> {
    const query = new Parse.Query(this.CAMPUS_CLASS);
    query.equalTo('municipality', { __type: 'Pointer', className: 'Municipality', objectId: municipalityId });
    query.descending('createdAt');
    return from(query.find()).pipe(
      map(results => results.map(campus => this.parseCampusObject(campus)))
    );
  }

  /**
   * Get a campus by ID
   * @param id Campus ID
   * @returns Observable with campus details
   */
  getCampusById(id: string): Observable<any> {
    const query = new Parse.Query(this.CAMPUS_CLASS);
    query.include('municipality');
    return from(query.get(id)).pipe(
      map(campus => this.parseCampusObject(campus))
    );
  }

  /**
   * Create a new campus
   * @param campusData Data for the new campus
   * @returns Observable with the created campus
   */
  createCampus(campusData: any): Observable<any> {
    const Campus = Parse.Object.extend(this.CAMPUS_CLASS);
    const campus = new Campus();

    // Set basic properties
    campus.set('name', campusData.name);
    campus.set('address', campusData.address || '');
    
    // Set arrays
    if (campusData.sections && Array.isArray(campusData.sections)) {
      campus.set('sections', campusData.sections);
    } else {
      campus.set('sections', []);
    }
    
    if (campusData.educationOfferings && Array.isArray(campusData.educationOfferings)) {
      campus.set('educationOfferings', campusData.educationOfferings);
    } else {
      campus.set('educationOfferings', []);
    }
    
    if (campusData.classes && Array.isArray(campusData.classes)) {
      campus.set('classes', campusData.classes);
    } else {
      campus.set('classes', []);
    }

    // Set geoPoint if latitude and longitude are provided
    if (campusData.latitude !== undefined && campusData.longitude !== undefined) {
      const geoPoint = new Parse.GeoPoint(campusData.latitude, campusData.longitude);
      campus.set('geoPoint', geoPoint);
    }

    // Set municipality pointer if it exists
    if (campusData.municipality && campusData.municipality.objectId) {
      const municipalityPointer = {
        __type: 'Pointer',
        className: 'Municipality',
        objectId: campusData.municipality.objectId
      };
      campus.set('municipality', municipalityPointer);
    }

    return from(campus.save()).pipe(
      map(result => this.parseCampusObject(result))
    );
  }

  /**
   * Update a campus
   * @param id Campus ID
   * @param campusData Updated campus data
   * @returns Observable with the updated campus
   */
  updateCampus(id: string, campusData: any): Observable<any> {
    const query = new Parse.Query(this.CAMPUS_CLASS);
    
    return from(query.get(id)).pipe(
      map(campus => {
        // Update properties if provided
        if (campusData.name) {
          campus.set('name', campusData.name);
        }
        
        if (campusData.address !== undefined) {
          campus.set('address', campusData.address);
        }
        
        // Update arrays if provided
        if (campusData.sections && Array.isArray(campusData.sections)) {
          campus.set('sections', campusData.sections);
        }
        
        if (campusData.educationOfferings && Array.isArray(campusData.educationOfferings)) {
          campus.set('educationOfferings', campusData.educationOfferings);
        }
        
        if (campusData.classes && Array.isArray(campusData.classes)) {
          campus.set('classes', campusData.classes);
        }
        
        // Update geoPoint if latitude and longitude are provided
        if (campusData.latitude !== undefined && campusData.longitude !== undefined) {
          const geoPoint = new Parse.GeoPoint(campusData.latitude, campusData.longitude);
          campus.set('geoPoint', geoPoint);
        }
        
        // Update municipality pointer if provided
        if (campusData.municipality && campusData.municipality.objectId) {
          const municipalityPointer = {
            __type: 'Pointer',
            className: 'Municipality',
            objectId: campusData.municipality.objectId
          };
          campus.set('municipality', municipalityPointer);
        }

        // Save and return the updated campus
        return from(campus.save()).pipe(
          map(result => this.parseCampusObject(result))
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
   * Delete a campus
   * @param id Campus ID
   * @returns Observable with success status
   */
  deleteCampus(id: string): Observable<boolean> {
    const query = new Parse.Query(this.CAMPUS_CLASS);
    
    return from(query.get(id)).pipe(
      map(campus => from(campus.destroy())),
      // Flatten the observable
      map(obs => from(obs)),
      // Convert to a simple observable
      obs => from(obs).pipe(
        map(() => true)
      )
    );
  }

  /**
   * Get institution sections by campus
   * @param campusId Campus ID
   * @returns Observable with list of institution sections
   */
  getInstitutionSectionsByCampus(campusId: string): Observable<any[]> {
    const query = new Parse.Query('InstitutionSection');
    query.equalTo('campus', { __type: 'Pointer', className: 'Campus', objectId: campusId });
    query.include('section');
    query.descending('createdAt');
    
    return from(query.find()).pipe(
      map(results => results.map(section => ({
        id: section.id,
        objectId: section.id,
        creationDate: section.get('creationDate'),
        closingDate: section.get('closingDate'),
        section: section.get('section') ? {
          id: section.get('section').id,
          objectId: section.get('section').id,
          name_fr: section.get('section').get('name_fr'),
          name_en: section.get('section').get('name_en'),
          slug: section.get('section').get('slug')
        } : null,
        campusId: campusId
      })))
    );
  }

  /**
   * Parse a campus object from Parse to a plain JS object
   * @param campus Parse campus object
   * @returns Plain JS object with campus data
   */
  private parseCampusObject(campus: any): any {
    const result: any = {
      id: campus.id,
      objectId: campus.id,
      name: campus.get('name'),
      address: campus.get('address'),
      sections: campus.get('sections') || [],
      educationOfferings: campus.get('educationOfferings') || [],
      classes: campus.get('classes') || [],
      createdAt: campus.get('createdAt'),
      updatedAt: campus.get('updatedAt')
    };

    // Add geoPoint if available
    const geoPoint = campus.get('geoPoint');
    if (geoPoint) {
      result.geoPoint = {
        latitude: geoPoint.latitude,
        longitude: geoPoint.longitude
      };
    }

    // Add municipality data if available
    const municipality = campus.get('municipality');
    if (municipality) {
      result.municipality = {
        id: municipality.id,
        objectId: municipality.id,
        name_fr: municipality.get('name_fr'),
        name_en: municipality.get('name_en'),
        slug: municipality.get('slug'),
        code: municipality.get('code')
      };
    }

    return result;
  }
} 