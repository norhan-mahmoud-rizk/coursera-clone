import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iuser } from '../Models/iuser';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

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
