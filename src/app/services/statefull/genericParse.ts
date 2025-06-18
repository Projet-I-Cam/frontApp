import Parse from 'parse'; // Ensure Parse is imported properly

import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';


export interface FilterStudent {
  personId?: string,
  yearId?: string;
  genderId?: string
  statut?: boolean
  sectionId?: string;
  classroomId?: string;
  classeId?: string;
  schoolId?: string;
  arronId?: string;
  departId?: string;
  regionId?: string;
  parentId?: string;
  enseignantId?: string
}

roleTaskName : [] = ['super', 'administration', 'regional', 'departement', 'arrondissement', 'etablissement', 'enseignant', 'parent', 'eleve'];

export async function listInscriptions2(f : FilterStudent) {
  const Enrollment = Parse.Object.extend("Enrollment");
  const query = new Parse.Query(Enrollment);

  // Filtrer par année académique
  if(f.yearId){
    const academicYearQuery = new Parse.Query("AcademicYear");
    academicYearQuery.equalTo("objectId", f.yearId);
    query.matchesQuery("academicYear", academicYearQuery);
  }


  // Filtrer par institution
  if(f.schoolId){
    const institutionQuery = new Parse.Query("Institution");
    institutionQuery.equalTo("objectId", f.schoolId);
    query.matchesQuery("institution", institutionQuery);
  }

  // Filtrer par arrondissement
  if (f.arronId) {
    const municipalityQuery = new Parse.Query("Municipality");
    municipalityQuery.equalTo("objectId", f.arronId);
    query.matchesQuery("person.municipality", municipalityQuery);
  }

  // Filtrer par département (person.municipality.departement)
  if (f.departId) {
    const departQuery = new Parse.Query("Department");
    departQuery.equalTo("objectId", f.departId);
    query.matchesQuery("person.municipality.department", departQuery);
  }

  // Filtrer par région (person.arrondissement.departement.region)
  if (f.regionId) {
    const regionQuery = new Parse.Query("Region");
    regionQuery.equalTo("objectId", f.regionId);
    query.matchesQuery("person.municipality.department.region", regionQuery);
  }

  query.include('person');
  query.include('person.gender');

  try {
      const results = await query.find();
      return results.map(result => result.toJSON()); // Retourne les résultats trouvés
  } catch (error) {
      console.error("Error fetching enrollments: ", error);
      throw error; // Gérer l'erreur selon vos besoins
  }
}

export async function listInscriptions(f: FilterStudent) {
  const Enrollment = Parse.Object.extend("Enrollment");
  const query = new Parse.Query(Enrollment);

  // Fonction utilitaire pour ajouter des filtres
  const addFilter = (query: Parse.Query<any>, className: string, field: string, value: string) => {
    if (value) {
      const subQuery = new Parse.Query(className);
      subQuery.equalTo("objectId", value);
      query.matchesQuery(field, subQuery);
    }
  };

  // Filtrer par statut
  if(f.statut != undefined){
    query.equalTo('isValid', f.statut);
  }
  //console.log("Query", f)

  // Filtrer par année académique
  addFilter(query, "AcademicYear", "academicYear", f.yearId || '');

  // Filtrer par Genre
  addFilter(query, "Gender", "person.gender", f.genderId || '');


  // Filtrer par Section
  addFilter(query, "Section", "classroom.classe.section", f.sectionId || '');

  // Filtrer par Classroom
  addFilter(query, "Classroom", "classroom", f.classroomId || '');

  // Filtrer par Classe
  addFilter(query, "Classe", "classroom.classe", f.classeId || '');

  // Filtrer par institution
  addFilter(query, "Institution", "institution", f.schoolId || '');

  // Filtrer par arrondissement
  addFilter(query, "Municipality", "person.municipality", f.arronId || '');

  // Filtrer par département
  addFilter(query, "Department", "person.municipality.department", f.departId || '');

  // Filtrer par région
  addFilter(query, "Region", "person.municipality.department.region", f.regionId || '');
  // ✅ NEW: Filtrer par identifiant de l'élève
  addFilter(query, "Person", "person", f.personId || '');

  // Inclure les données liées
  query.include('person');
  query.include('person.gender');
  query.include('classe');
  query.include('classroom.classe');
  query.include('classroom.classe.section');
  query.include('institution');

  try {
    const results = await query.find();
    console.log(results);
    return results.map(result => result.toJSON()); // Retourne les résultats trouvés
  } catch (error) {
    console.error("Error fetching enrollments: ", error);
    throw new Error("Failed to fetch enrollments. Please try again later."); // Gérer l'erreur selon vos besoins
  }
}






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
       // console.log(`${className} found by pointer ${pointerField}:`, object.toJSON());
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

/**
 * Global utility function to fetch the Person object associated with the current user.
 * Accepts an AuthService instance and a callback to handle the result.
 * Handles subscription and logs errors internally.
 *
 * @param authService - the AuthService instance to get the current user
 * @param onResult - callback function to receive the Person object or null
 */
export function fetchCurrentPerson(
  authService: AuthService,
  onResult: (person: any | null) => void
): void {
  const currentUser = authService.getCurrentUser();
  if (!currentUser || !currentUser.id) {
    console.error('No current user found.');
    onResult(null);
    return;
  }
  console.log(currentUser.id)
  getOneByPointer$('Person', 'user', '_User', currentUser.id).subscribe(result => {
    if (result?.error) {
      console.error(result.message);
      onResult(null);
    } else if (result) {
      onResult(result);
    } else {
      console.log('No person found for that user pointer.');
      onResult(null);
    }
  });
}



export async function getEnrolledStudents(academicYearId: string) {
  try {
      // Requête pour récupérer les inscriptions à l'année académique donnée
      const EnrollmentQuery = new Parse.Query("Enrollment");
      const AcademicYear = Parse.Object.extend("AcademicYear");
      const academicYearPointer = AcademicYear.createWithoutData(academicYearId);

      EnrollmentQuery.equalTo("academicYear", academicYearPointer);

      // Chercher les inscriptions
      const enrollments = await EnrollmentQuery.find();

      if (enrollments.length === 0) {
          return []; // Aucun inscrit trouvé, retourner un tableau vide
      }

      // Extraire les IDs des personnes inscrites
      const personIds = enrollments
          .map(enrollment => {
              const person = enrollment.get("person");
              return person ? person.id : null;
          })
          .filter(id => id !== null);

      if (personIds.length === 0) {
          return []; // Aucun ID trouvé, retourner un tableau vide
      }

      // Requête pour récupérer les personnes avec isStudent == true
      const PersonQuery = new Parse.Query("Person");
      PersonQuery.containedIn("objectId", personIds);
      PersonQuery.equalTo("isStudent", true);

      const students = await PersonQuery.find();

      return students; // Retourner la liste des étudiants

  } catch (error) {
      console.error("Erreur dans EnrollmentService.getEnrolledStudents :", error);
      throw error; // Rethrow l'erreur pour un traitement ultérieur
  }
}


export async function getEnrolledStudentsBySchool(academicYearId: string, establishmentId: string) {
  try {
      const EnrollmentQuery = new Parse.Query("Enrollment");
      const AcademicYear = Parse.Object.extend("AcademicYear");
      const academicYearPointer = AcademicYear.createWithoutData(academicYearId);

      EnrollmentQuery.equalTo("academicYear", academicYearPointer);
      const enrollments = await EnrollmentQuery.find();

      if (enrollments.length === 0) {
          return []; // Aucun inscrit trouvé, retourner un tableau vide
      }

      const personIds = enrollments
          .map(enrollment => {
              const person = enrollment.get("person");
              return person ? person.id : null;
          })
          .filter(id => id !== null);

      if (personIds.length === 0) {
          return []; // Aucun ID trouvé, retourner un tableau vide
      }

      const PersonQuery = new Parse.Query("Person");
      PersonQuery.containedIn("objectId", personIds);
      PersonQuery.equalTo("isStudent", true);
      PersonQuery.equalTo("establishment", establishmentId); // Filtrer par établissement
      PersonQuery.limit(1000); // Ajustez la limite si nécessaire
      PersonQuery.select("objectId", "name", "email", "establishment"); // Sélectionnez les champs nécessaires

      const students = await PersonQuery.find();
      return students.map(student => student.toJSON());

  } catch (error) {
      console.error("Erreur dans EnrollmentService.getEnrolledStudentsBySchool :", error);
      throw error; // Rethrow l'erreur pour un traitement ultérieur
  }
}



export async function listInscriptionByYear(academicYearId: any) {
  const Enrollment = Parse.Object.extend("Enrollment");
  const query = new Parse.Query(Enrollment);

  // Filtrer par année académique
  const academicYearQuery = new Parse.Query("AcademicYear");
  academicYearQuery.equalTo("objectId", academicYearId);

  // Ajouter les filtres à la requête
  query.matchesQuery("academicYear", academicYearQuery);

  try {
      const results = await query.find();
      return results.map(result => result.toJSON()); // Retourne les résultats trouvés
  } catch (error) {
      console.error("Error fetching enrollments: ", error);
      throw error; // Gérer l'erreur selon vos besoins
  }
}





/**
 * Function to get the current AcademicYear object.
 *
 * Prerequisite: Parse SDK must be initialized before calling this function.
 *
 * @returns {Promise<Parse.Object|null>} The current AcademicYear object or null if none found.
 */
export async function getLiteCurrentAcademicYear() {
  try {
      const query = new Parse.Query("AcademicYear");
      query.equalTo("isCurrent", true);
      const currentYear = await query.first();

      if (!currentYear) {
          return null; // Return null if no current academic year is found
      }
      // Fetch all columns, passing an empty object as options
      await currentYear.fetch({}); // Pass an empty object to satisfy the method signature
      // Accessing attributes
      const attributes = {
          objectId: currentYear.get("objectId"),
          libelle: currentYear.get("libelle"),
          isCurrent: currentYear.get("isCurrent"),
          // inscrits: currentYear.get("inscrits"),
          createdAt: currentYear.createdAt,
          // updatedAt: currentYear.updatedAt,
      };
      return attributes; // Return the attributes you want
  } catch (error) {
      console.error("Error fetching current AcademicYear:", error);
      throw error; // Rethrow the error for further handling
  }
}

export async function getCurrentAcademicYear() {
  try {
      const query = new Parse.Query("AcademicYear");
      query.equalTo("isCurrent", true);
      const currentYear = await query.first();

      if (!currentYear) {
          return null; // Aucun résultat
      }

      // Récupérer toutes les colonnes, fetch() avec options vides pour éviter erreurs TS
      await currentYear.fetch({});

      // Retourner un objet JavaScript simple avec tous les champs
      return currentYear.toJSON();
  } catch (error) {
      console.error("Error fetching current AcademicYear:", error);
      throw error;
  }
}


export async function getPersonByUserId(userId: string) {
  try {
      const query = new Parse.Query("Person");
      query.include("municipality");
      query.include("municipality.department");
      query.include("municipality.department.region");
      query.include('institution');
      query.include('staffType');
      query.include('institution')
      const userPointer = Parse.Object.extend("_User").createWithoutData(userId); // Créer un pointeur vers l'utilisateur
      query.equalTo("user", userPointer); // Filtrer par le champ user
      const person = await query.first(); // Récupérer la première correspondance
      if (!person) {
          return null; // Retourner null si aucune personne n'est trouvée
      }

      return person.toJSON(); // Retourner l'objet sous forme de JSON
  } catch (error) {
      console.error("Erreur lors de la récupération de la personne par userId :", error);
      throw error; // Rethrow l'erreur pour un traitement ultérieur
  }
}


