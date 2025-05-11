import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Iuser } from '../Models/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL = `${environment.backendURL}/user`;
  private currentUserSubject = new BehaviorSubject<Iuser | null>(null);//This Observable holds the latest user data, and if there is no current user, it will be null.
  currentUser$ = this.currentUserSubject.asObservable();//We convert the BehaviorSubject to a normal Observable so that no one can modify it from the outside.
// We convert the BehaviorSubject to a regular Observable using asObservable()
// This gives us a read-only copy of the current user's state
// The goal is for the component to be able to subscribe to changes, but not modify the data
// This way, we protect the internal state of the service and avoid any unintended external modifications
// Take this data and read it (subscribe to it), but don't change it

  constructor(private http: HttpClient) {
// ممكن اخليه بيانات اليوزر اللي راجع 
  //If there is user data stored in localStorage, we return it and leave the current values ​​in currentUserSubject.
    const storedUser = localStorage.getItem('user');
    if (storedUser) {


      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // فين الاستقبال 
//It sends the new user's data to the /signup link and receives a message and the data of the registered user.
  register(userData: Partial<Iuser>): Observable<{ message: string; user: Iuser }> {
    return this.http.post<{ message: string; user: Iuser }>(`${this.baseURL}/signup`, userData);
  }

  // It sends the email and password to the API, and returns a token if the login is successful.

// This means that the function returns an Observable containing an object:

// message: string → message from the server (e.g., "Login successful")

// userToken: string → token returned from the backend (usually JWT)



  login(email: string, password: string): Observable<{ message: string; userToken: string }> {
    return this.http.post<{ message: string; userToken: string }>(
      `${this.baseURL}/signin`,
      { email, password }
    );
  }

  confirmEmail(email: string, code: string): Observable<{ message: string; userToken: string }> {
    return this.http.patch<{ message: string; userToken: string }>(
      `${this.baseURL}/confirm-email`,
      { email, code }
    );
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  // Saves the current user to localStorage and updates the value inside the BehaviorSubject.

  setCurrentUser(user: Partial<Iuser>): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user as Iuser);
  }
// It removes the token and user from local storage, emptying the value into the BehaviorSubject, and can also report it to the server if you like.
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.http.post(`${this.baseURL}/logout`, {}).subscribe(); // Optional
  }
// Returns the last user stored within the BehaviorSubject.
  getCurrentUser(): Iuser | null {
    return this.currentUserSubject.value;
  }
}