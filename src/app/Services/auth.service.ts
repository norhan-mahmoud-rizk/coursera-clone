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
  private currentUserSubject = new BehaviorSubject<Iuser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  register(userData: Partial<Iuser>): Observable<{ message: string; user: Iuser }> {
    return this.http.post<{ message: string; user: Iuser }>(`${this.baseURL}/signup`, userData);
  }

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

  setCurrentUser(user: Partial<Iuser>): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user as Iuser);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.http.post(`${this.baseURL}/logout`, {}).subscribe(); // Optional
  }

  getCurrentUser(): Iuser | null {
    return this.currentUserSubject.value;
  }
}