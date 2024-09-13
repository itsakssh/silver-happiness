import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HeaderService } from './header.service';
import { environment } from '../../environments/environment';
import { DataTablesResponse } from '../data-tables-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  static getNetworks() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private headerService: HeaderService) {}

  // get(data:any): Observable<any> {
  //   return this.http.get<any>(this.apiUrl+data.url)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error fetching data:', error);
  //         return throwError(() => new Error('Error fetching data'));
  //       })
  //     );
  // }
  // post(data:any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl+data.url,data)
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error fetching data:', error);
  //         return throwError(() => new Error('Error fetching data'));
  //       })
  //     );
  // }
  // login(data:any): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'Authorization': `Bearer ${'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjU2NTg4NDIsImV4cCI6MTcyNTY2MjQ0MiwiZW1haWwiOiJsYWxpdHJhbmEyMDE4ckBnbWFpbC5jb20ifQ.RwujcUacLzi3LD5z0EKUlMYJfwf7pdSk_dyZF0l4OpA'}`
  //   });

  //   return this.http.get<any>('http://online-exam.loc/users')
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error fetching data:', error);
  //         return throwError(() => new Error('Error fetching data'));
  //       })
  //     );
  // }
  login(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(this.apiUrl + 'login', data, this.headerService.getHeader())
        .subscribe((res) => {
          resolve(res);
        });
    });
  }

  Baxyget(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(this?.apiUrl + data?.url, this.headerService.getHeader())
        .subscribe((res) => {
          resolve(res);
        });
    });
  }
  post(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(this?.apiUrl + data?.url, data, this.headerService.getHeader())
        ?.subscribe((res) => {
          resolve(res);
          reject(new Error());
        });
    });
  }

  // *********************Network**************************************************************************************************
  addNetworks(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(
          this.apiUrl + 'api/networks/create',
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  getNetworks(data: any): Observable<DataTablesResponse> {
    return this.http
      .post<DataTablesResponse>(
        this.apiUrl + 'api/networks',
        data,
        this.headerService.getHeader()
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(() => new Error('Error fetching data'));
        })
      );
  }
  getNetworkById(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(
          this.apiUrl + `api/networks/show/${id}`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  updateNetwork(data: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .put(
          this.apiUrl + `api/networks/update/${id}`,
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  deleteNetwork(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .delete(
          this.apiUrl + `api/networks/delete/${id}`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  // *********************Location**************************************************************************************************

  getLocation(data: any): Observable<DataTablesResponse> {
    return this.http
      .post<DataTablesResponse>(
        this.apiUrl + 'api/locations',
        data,
        this.headerService.getHeader()
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(() => new Error('Error fetching data'));
        })
      );
  }

  addLocation(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(
          this.apiUrl + 'api/locations/create',
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  getLocationById(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(
          this.apiUrl + `api/locations/show/${id}`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  updateLocation(data: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .put(
          this.apiUrl + `api/locations/update/${id}`,
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  deleteLocation(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .delete(
          this.apiUrl + `api/locations/delete/${id}`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  // *********************PLAYLIST**************************************************************************************************
  getPlaylist(data: any): Observable<DataTablesResponse> {
    return this.http
      .post<DataTablesResponse>(
        this.apiUrl + 'api/playlists',
        data,
        this.headerService.getHeader()
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(() => new Error('Error fetching data'));
        })
      );
  }

  addPlaylist(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(
          this.apiUrl + 'api/playlists/create',
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  getPlaylistById(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(
          this.apiUrl + `api/playlists/show/${id}`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  updatePlaylist(data: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .put(
          this.apiUrl + `api/playlists/update/${id}`,
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  deletePlaylist(id: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .delete(
          this.apiUrl + `api/playlists/delete/${id}`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  // *********************County**************************************************************************************************
  getCountryList() {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(
          this.apiUrl + `api/get_country_list`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  getTimeZone(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(
          this.apiUrl + `api/get_timezone_list`,
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  // *********************Layout**************************************************************************************************
  getLayout(data: any): Observable<DataTablesResponse> {
    return this.http
      .post<DataTablesResponse>(
        this.apiUrl + 'api/layouts',
        data,
        this.headerService.getHeader()
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(() => new Error('Error fetching data'));
        })
      );
  }
  addLayout(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post(
          this.apiUrl + 'api/layouts/create',
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  getLayoutById(id: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .get(
          this.apiUrl + `api/layouts/show/${id}`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  updateLayout(data: any, id: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .put(
          this.apiUrl + `api/layouts/update/${id}`,
          data,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
  deleteLayout(id: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .delete(
          this.apiUrl + `api/layouts/delete/${id}`,
          this.headerService.getHeader()
        )
        .subscribe(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }
}
