import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Parse from 'parse';
import { Region, Department, Municipality, Country } from '../shared/model/institution.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  /**
   * Get all countries
   * @returns Observable with list of countries
   */
  getAllCountries(): Observable<Country[]> {
    const query = new Parse.Query('Country');
    query.ascending('name_fr');
    return from(query.find()).pipe(
      map(results => results.map(country => ({
        id: country.id,
        objectId: country.id,
        name_fr: country.get('name_fr'),
        name_en: country.get('name_en'),
        codeISO: country.get('codeISO'),
        phoneCode: country.get('phoneCode'),
        phoneFormat: country.get('phoneFormat'),
        currency: country.get('currency'),
        createdAt: country.get('createdAt'),
        updatedAt: country.get('updatedAt')
      })))
    );
  }

  /**
   * Get all regions
   * @returns Observable with list of regions
   */
  getAllRegions(): Observable<Region[]> {
    const query = new Parse.Query('Region');
    query.include('country');
    query.ascending('name_fr');
    return from(query.find()).pipe(
      map(results => results.map(region => {
        const result: any = {
          id: region.id,
          objectId: region.id,
          name_fr: region.get('name_fr'),
          name_en: region.get('name_en'),
          slug: region.get('slug'),
          code: region.get('code'),
          createdAt: region.get('createdAt'),
          updatedAt: region.get('updatedAt')
        };
        
        const country = region.get('country');
        if (country) {
          result.country = {
            id: country.id,
            objectId: country.id,
            name_fr: country.get('name_fr'),
            name_en: country.get('name_en'),
            codeISO: country.get('codeISO')
          };
        }
        
        return result;
      }))
    );
  }

  /**
   * Get regions by country
   * @param countryId Country ID
   * @returns Observable with list of regions
   */
  getRegionsByCountry(countryId: string): Observable<Region[]> {
    const query = new Parse.Query('Region');
    query.equalTo('country', { __type: 'Pointer', className: 'Country', objectId: countryId });
    query.ascending('name_fr');
    return from(query.find()).pipe(
      map(results => results.map(region => ({
        id: region.id,
        objectId: region.id,
        name_fr: region.get('name_fr'),
        name_en: region.get('name_en'),
        slug: region.get('slug'),
        code: region.get('code'),
        createdAt: region.get('createdAt'),
        updatedAt: region.get('updatedAt')
      })))
    );
  }

  /**
   * Get all departments
   * @returns Observable with list of departments
   */
  getAllDepartments(): Observable<Department[]> {
    const query = new Parse.Query('Department');
    query.include('region');
    query.ascending('name_fr');
    return from(query.find()).pipe(
      map(results => results.map(department => {
        const result: any = {
          id: department.id,
          objectId: department.id,
          name_fr: department.get('name_fr'),
          name_en: department.get('name_en'),
          slug: department.get('slug'),
          code: department.get('code'),
          createdAt: department.get('createdAt'),
          updatedAt: department.get('updatedAt')
        };
        
        const region = department.get('region');
        if (region) {
          result.region = {
            id: region.id,
            objectId: region.id,
            name_fr: region.get('name_fr'),
            name_en: region.get('name_en'),
            slug: region.get('slug'),
            code: region.get('code')
          };
        }
        
        return result;
      }))
    );
  }

  /**
   * Get departments by region
   * @param regionId Region ID
   * @returns Observable with list of departments
   */
  getDepartmentsByRegion(regionId: string): Observable<Department[]> {
    const query = new Parse.Query('Department');
    query.equalTo('region', { __type: 'Pointer', className: 'Region', objectId: regionId });
    query.ascending('name_fr');
    return from(query.find()).pipe(
      map(results => results.map(department => ({
        id: department.id,
        objectId: department.id,
        name_fr: department.get('name_fr'),
        name_en: department.get('name_en'),
        slug: department.get('slug'),
        code: department.get('code'),
        createdAt: department.get('createdAt'),
        updatedAt: department.get('updatedAt')
      })))
    );
  }

  /**
   * Get all municipalities
   * @returns Observable with list of municipalities
   */
  getAllMunicipalities(): Observable<Municipality[]> {
    const query = new Parse.Query('Municipality');
    query.include('department');
    query.ascending('name_fr');
    return from(query.find()).pipe(
      map(results => results.map(municipality => {
        const result: any = {
          id: municipality.id,
          objectId: municipality.id,
          name_fr: municipality.get('name_fr'),
          name_en: municipality.get('name_en'),
          slug: municipality.get('slug'),
          code: municipality.get('code'),
          createdAt: municipality.get('createdAt'),
          updatedAt: municipality.get('updatedAt')
        };
        
        const department = municipality.get('department');
        if (department) {
          result.department = {
            id: department.id,
            objectId: department.id,
            name_fr: department.get('name_fr'),
            name_en: department.get('name_en'),
            slug: department.get('slug'),
            code: department.get('code')
          };
        }
        
        return result;
      }))
    );
  }

  /**
   * Get municipalities by department
   * @param departmentId Department ID
   * @returns Observable with list of municipalities
   */
  getMunicipalitiesByDepartment(departmentId: string): Observable<Municipality[]> {
    const query = new Parse.Query('Municipality');
    query.equalTo('department', { __type: 'Pointer', className: 'Department', objectId: departmentId });
    query.ascending('name_fr');
    return from(query.find()).pipe(
      map(results => results.map(municipality => ({
        id: municipality.id,
        objectId: municipality.id,
        name_fr: municipality.get('name_fr'),
        name_en: municipality.get('name_en'),
        slug: municipality.get('slug'),
        code: municipality.get('code'),
        createdAt: municipality.get('createdAt'),
        updatedAt: municipality.get('updatedAt')
      })))
    );
  }

  /**
   * Get all zones
   * @returns Observable with list of zones
   */
  getAllZones(): Observable<any[]> {
    const query = new Parse.Query('Zone');
    query.ascending('name_fr');
    return from(query.find()).pipe(
      map(results => results.map(zone => ({
        id: zone.id,
        objectId: zone.id,
        name_fr: zone.get('name_fr'),
        name_en: zone.get('name_en'),
        description: zone.get('description'),
        createdAt: zone.get('createdAt'),
        updatedAt: zone.get('updatedAt')
      })))
    );
  }
} 