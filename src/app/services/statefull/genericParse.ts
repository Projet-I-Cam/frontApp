import Parse from 'parse'; // Ensure Parse is imported properly

import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Generic function to perform a 'find all' query on Parse Server.
 * 
 * @param className - The Parse class name to query.
 * @param includes - An array of pointer fields to include in the results.
 * @param selectFields - Optional array of fields to select (retrieve).
 * @returns Promise resolving to an array of all Parse Objects found.
 */
export async function genericFindAll(
  className: string,
  includes: string[] = [],
  selectFields?: string[]
): Promise<Parse.Object[]> {
  const ParseClass = Parse.Object.extend(className);
  const query = new Parse.Query(ParseClass);

  includes.forEach(includeField => {
    query.include(includeField);
  });

  if (selectFields && selectFields.length > 0) {
    query.select(...selectFields);
  }

  try {
    const results = await query.find();
    return results;
  } catch (error) {
    console.error('Error in genericFindAll:', error);
    throw error;
  }
}

/**
 * Generic function to perform a 'find by' query on Parse Server.
 * 
 * @param className - The Parse class name to query.
 * @param filters - An object with keys as field names and values as the expected field values.
 * @param includes - An array of pointer fields to include in the results.
 * @param selectFields - Optional array of fields to select (retrieve).
 * @returns Promise resolving to an array of Parse Objects found.
 */
export async function genericFindBy(
  className: string,
  filters: Record<string, any> = {},
  includes: string[] = [],
  selectFields?: string[]
): Promise<Parse.Object[]> {
  const ParseClass = Parse.Object.extend(className);
  const query = new Parse.Query(ParseClass);

  // Add filters - use equalTo for each key/value
  for (const [field, value] of Object.entries(filters)) {
    query.equalTo(field, value);
  }

  includes.forEach(includeField => {
    query.include(includeField);
  });

  if (selectFields && selectFields.length > 0) {
    query.select(...selectFields);
  }

  try {
    const results = await query.find();
    return results;
  } catch (error) {
    console.error('Error in genericFindBy:', error);
    throw error;
  }
}

/**
 * Generic function to perform a 'find one by' query on Parse Server.
 * 
 * @param className - The Parse class name to query.
 * @param filters - An object with keys as field names and values as the expected field values.
 * @param includes - An array of pointer fields to include in the result.
 * @param selectFields - Optional array of fields to select (retrieve).
 * @returns Promise resolving to a single Parse Object or null if not found.
 */
export async function genericFindOneBy(
  className: string,
  filters: Record<string, any> = {},
  includes: string[] = [],
  selectFields?: string[]
): Promise<Parse.Object | null> {
  const ParseClass = Parse.Object.extend(className);
  const query = new Parse.Query(ParseClass);

  for (const [field, value] of Object.entries(filters)) {
    query.equalTo(field, value);
  }

  includes.forEach(includeField => {
    query.include(includeField);
  });

  if (selectFields && selectFields.length > 0) {
    query.select(...selectFields);
  }

  try {
    const result = await query.first();
    return result ?? null;
  } catch (error) {
    console.error('Error in genericFindOneBy:', error);
    throw error;
  }
}

/* 
    const students = await genericFindBy(
        'Person',
        { user: someUserPointer },
        ['gender', 'municipality'],
        ['name', 'age', 'gender']  // select only these fields
    );
*/

  /**
 * Generic function to retrieve a single object from Parse Server by class name and object ID.
 * 
 * @param className - The name of the Parse class to query.
 * @param objectId - The object ID of the Parse object to retrieve.
 * @returns Promise resolving to the object data or an error message.
 */
export const getOneObject = async (className: string, objectId: string): Promise<any> => {
  try {
      const ParseClass = Parse.Object.extend(className);
      const query = new Parse.Query(ParseClass);
      
      const object = await query.get(objectId);
      console.log(`${className} found:`, object.toJSON());
      return object.toJSON();
  } catch (error: any) {
      console.error(`Error getting ${className}:`, error);
      return {
          error: true,
          message: error?.message || "Unable to resolve the requested query!"
      };
  }
};


/**
 * Generic function to retrieve one Parse object by pointer field, returning an Observable.
 * 
 * @param className - Parse class name to query (e.g., 'Person').
 * @param pointerField - The pointer field name to filter by (e.g., 'user').
 * @param pointerClassName - The class name of the pointer object (e.g., '_User').
 * @param pointerObjectId - The objectId of the pointer object.
 * @returns Observable emitting the found object data or an error object.
 */
export function getOneByPointer$(
  className: string,
  pointerField: string,
  pointerClassName: string,
  pointerObjectId: string
): Observable<any> {

  const ParseClass = Parse.Object.extend(className);
  const query = new Parse.Query(ParseClass);

  // Create pointer object for filtering
  const pointerObject = new (Parse.Object.extend(pointerClassName))();
  pointerObject.id = pointerObjectId;

  // Filter by pointer field
  query.equalTo(pointerField, pointerObject);

  // Use first() to get one object matching the pointer
  return from(query.first()).pipe(
    map(object => {
      if (object) {
        console.log(`${className} found by pointer ${pointerField}:`, object.toJSON());
        return object.toJSON();
      } else {
        return null;  // or a custom "not found" object
      }
    }),
    catchError(error => {
      console.error(`Error getting ${className} by pointer ${pointerField}:`, error);
      return of({
        error: true,
        message: error?.message || "Unable to resolve the requested query!"
      });
    })
  );
}