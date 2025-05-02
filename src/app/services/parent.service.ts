import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parent } from '../shared/model/pages.model';


@Injectable({
  providedIn: 'root'
})
export class ParentService {
  private readonly PARENT_CLASS = 'Parent';
  private apiUrl = environment.parseServerUrl;
  private headers = new HttpHeaders({
    'X-Parse-Application-Id': environment.parseAppId,
    'X-Parse-REST-API-Key': environment.parseRestApiKey,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // Méthode pour sauvegarder un nouveau parent
  saveParent(parent: Parent): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Parent`, parent, { headers: this.headers });
  }

  // Méthode pour mettre à jour un parent existant
  updateParent(parent: Parent): Observable<any> {
    const objectId = parent.person.objectId; // Assurez-vous que l'ID de l'objet est présent
    return this.http.put<any>(`${this.apiUrl}/Parent/${objectId}`, parent, { headers: this.headers });
  }
}
  
