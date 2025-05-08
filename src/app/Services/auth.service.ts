import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Iuser } from '../Models/iuser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseURL = 'http://localhost:3000/users';
  private baseURL = `${environment.baseURL}/users`;
  private currentUserSubject = new BehaviorSubject<Iuser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = this.getToken();
    if (token) {
      this.http.get<Iuser>(`${this.baseURL}/${token}`).subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.logout()
      });
    }
  }

  register(user: Iuser): Observable<Iuser> {
    user.id = Date.now().toString(); // Generate ID as string
    user.myLearning = []; 
    return this.http.post<Iuser>(this.baseURL, user);
  }

  login(email: string, password: string): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(`${this.baseURL}?email=${email}&password=${password}`);
  }

  setToken(user: Iuser): void {
    localStorage.setItem('token', user.id);
    this.currentUserSubject.next(user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Iuser | null {
    return this.currentUserSubject.value;
  }

  

}




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { environment } from '../../environments/environment.development';

// export interface IUser {
//   id?: string;
//   username: string;
//   email: string;
//   password: string;
//   address?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private baseURL = `${environment.backendURL}/user`;
//   private currentUserSubject = new BehaviorSubject<IUser | null>(null);
//   currentUser$ = this.currentUserSubject.asObservable();

//   constructor(private http: HttpClient) {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       this.currentUserSubject.next(JSON.parse(storedUser));
//     }
//   }

//   register(userData: Partial<IUser>): Observable<any> {
//     return this.http.post(`${this.baseURL}/signup`, userData);
//   }

//   login(email: string, password: string): Observable<{ message: string; userToken: string }> {
//     return this.http.post<{ message: string; userToken: string }>(`${this.baseURL}/signin`, {
//       email,
//       password
//     });
//   }

//   setToken(token: string): void {
//     localStorage.setItem('token', token);
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   setCurrentUser(user: Partial<IUser>): void {
//     localStorage.setItem('user', JSON.stringify(user));
//     this.currentUserSubject.next(user as IUser);
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     this.currentUserSubject.next(null);
//     this.http.post(`${this.baseURL}/logout`, {}).subscribe(); // Optional
//   }

//   getCurrentUser(): IUser | null {
//     return this.currentUserSubject.value;
//   }
// }