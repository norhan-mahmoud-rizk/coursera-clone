import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HomeCard } from '../Models/home-card';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
  ) { }
  URL:string=`${environment.baseURL}`
  getAllProduct() {
    return this.http.get<HomeCard[]>(`${this.URL}/Career`)
  }
  getByID(id: string) {
    return this.http.get<HomeCard>(`${this.URL}/Career/${id}`)
  }

}
