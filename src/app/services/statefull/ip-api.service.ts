import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpApiService {
  private apiUrl = 'http://ip-api.com/json/';

  constructor(private http: HttpClient) {}

  getIpInfo(ip: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${ip}`);
  }
}