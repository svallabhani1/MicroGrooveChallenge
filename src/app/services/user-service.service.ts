import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }


  public getData(name: string) {
    return this.http.get('https://tagdiscovery.com/api/get-initials?name=' + name,{ responseType: 'blob' });
  }
} 
