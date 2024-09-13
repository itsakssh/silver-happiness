import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor() {}
  getHeader() {
    return {
      headers: new HttpHeaders({
        // key: localStorage.getItem('authToken') || '',
        // userid: localStorage.getItem('userid') || localStorage.getItem('fuserid') || '',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getToken(),
      }),
    };
  }

  getToken() {
    // Logic to retrieve token
    return localStorage.getItem('token') || null;
  }
}
