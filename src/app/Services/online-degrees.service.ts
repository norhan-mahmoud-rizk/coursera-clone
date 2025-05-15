import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IOnlineDegrees } from '../Models/ionline-degrees';
import { IExperts } from '../Models/iexperts';
import { IFaqs } from '../Models/ifaqs';
import { ITopics } from '../Models/itopics';

@Injectable({
  providedIn: 'root',
})
export class OnlineDegreesService {
  httpHeaders = {};

  constructor(private httpclient: HttpClient) {
    this.httpHeaders = {
      Headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
    };
  }

  baseURL: string = `${environment.baseURL}/degree`;
  // collection1: string = `${environment.baseURL}/collection1`;
  // collection2: string = `${environment.baseURL}/collection2`;
  // collection3: string = `${environment.baseURL}/collection3`;
  // collection4: string = `${environment.baseURL}/collection4`;
  // collection5: string = `${environment.baseURL}/collection5`;
  experts: string = `${environment.baseURL}/experts`;
  faqs: string = `${environment.baseURL}/faqs`;
  topics: string = `${environment.baseURL}/topics`;

  getAllDegrees(): Observable<IOnlineDegrees[]> {
    return this.httpclient.get<IOnlineDegrees[]>(`${this.baseURL}/allDegrees`);
  }

  // getCollection1(): Observable<IOnlineDegrees[]> {
  //   return this.httpclient.get<IOnlineDegrees[]>(`${this.collection1}`);
  // }

  // getCollection2(): Observable<IOnlineDegrees[]> {
  //   return this.httpclient.get<IOnlineDegrees[]>(`${this.collection2}`);
  // }

  // getCollection3(): Observable<IOnlineDegrees[]> {
  //   return this.httpclient.get<IOnlineDegrees[]>(`${this.collection3}`);
  // }

  // getCollection4(): Observable<IOnlineDegrees[]> {
  //   return this.httpclient.get<IOnlineDegrees[]>(`${this.collection4}`);
  // }

  // getCollection5(): Observable<IOnlineDegrees[]> {
  //   return this.httpclient.get<IOnlineDegrees[]>(`${this.collection5}`);
  // }

  getExperts(): Observable<IExperts[]> {
    return this.httpclient.get<IExperts[]>(`${this.experts}`);
  }

  getFaqs(): Observable<IFaqs[]> {
    return this.httpclient.get<IFaqs[]>(`${this.faqs}`);
  }

  getTopics(): Observable<ITopics[]> {
    return this.httpclient.get<ITopics[]>(`${this.topics}`);
  }
}
