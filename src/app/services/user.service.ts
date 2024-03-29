import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string = 'https://reqres.in/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${this.url}/users?per_page=12&delay=5`).pipe(
      map((response: any) => response.data)
    );
  }

  getUser(id: string) {
    return this.http.get(`${this.url}/users/${id}`).pipe(
      map((response: any) => response.data)
    );
  }
}
