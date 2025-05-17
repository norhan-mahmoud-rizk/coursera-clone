import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { Observable } from 'rxjs';
import { ICareerCourses } from '../Models/ICareerCourses';
import { CoursesCategories } from '../Models/CoursesCategories';
import { CareerResourses } from '../Models/career-resourses';
import { CareerResoursesCategory } from '../Models/career-resourses-category';
import { SucessStories } from '../Models/sucess-stories';
import { WhatWeGains } from '../Models/WhatWeGains';
import { Achieve } from '../Models/achieve';


@Injectable({
  providedIn: 'root'
})
export class ServiceWithApiService {
  httpheaders={};
  constructor(public httpclient:HttpClient) {

   
    this.httpheaders={
      Headers:new HttpHeaders({'content-type':'application/json'})    }
   }

  
  baseURLCareerCourse:string=`${environment.backendURL}/course/allCourse`;//done
  baseURLGetOneCareerCourse:string=`${environment.backendURL}/course`;//done
  // get all the career courses and there category
  baseURLCareerCourseCategory:string=`${environment.backendURL}/Category/allCategories`;//done in the buutons of the filteration
  baseURLCareerCourseCategory2:string=`${environment.backendURL}/course/allCoursesByCat`;//this is sours of the issue i do not need it he must handle he filteration on the baseURLCareerCourse
// get all career resourse and thair category 
  baseURLcareerResources: string = `${environment.backendURL}/careeerResource/allCareerResources`;//done in career resourses
baseURLcareerResourceCategories: string = `${environment.backendURL}/careeerResourceCategories/allCareerResourceCategories`;//done  with the operation of the filteration

// get the sucees stories 
 baseURLsuccessStories:string=`${environment.backendURL}/successStory/allsuccessStories`;
  baseURLGains:string=`${environment.baseURL}/Gains`;
  baseURLAchieve:string=`${environment.baseURL}/Achieve`;


  // /get all career courses
  GetAllCareerCourses(): Observable<ICareerCourses[]> {
    return this.httpclient.get<ICareerCourses[]>(this.baseURLCareerCourse);
  }
// get course by id
getCarerrCourseById(CourseId: string): Observable<ICareerCourses> {
    return this.httpclient.get<ICareerCourses>(`${this.baseURLGetOneCareerCourse}/${CourseId}`);
  }

// get all catgories of career courses
  getCareerCourseCategory(): Observable<CoursesCategories[]> {
    return this.httpclient.get<CoursesCategories[]>(this.baseURLCareerCourseCategory);
  }
  
  // query string to search by cat Id

getCourseByCatId(catValu: string): Observable<ICareerCourses[]> {
  const filter = JSON.stringify({ categoryID: catValu });
  const url = `${this.baseURLCareerCourseCategory2}?filter=${encodeURIComponent(filter)}`;
  return this.httpclient.get<ICareerCourses[]>(url);
}


// Get all career resources // Get all career resources
  GetAllCareerResourses(): Observable<CareerResourses[]> {
    return this.httpclient.get<CareerResourses[]>(this.baseURLcareerResources);
  }

  // Get all resource categories
  getCareerResoursesCategory(): Observable<CareerResoursesCategory[]> {
    return this.httpclient.get<CareerResoursesCategory[]>(this.baseURLcareerResourceCategories);
  }

  // Get resources filtered by category
  getCareerResoursesByCategory(categoryID: string): Observable<CareerResourses[]> {
    return this.httpclient.get<CareerResourses[]>(`${this.baseURLcareerResources}?CareerResourceCategory=${categoryID}`);
  }


  // get all success stories 
   GetAllSuccessStories():Observable<SucessStories[]>{
    return this.httpclient.get<SucessStories[]>(`${this.baseURLsuccessStories}`)
   }


  //  get all what we offer
  getWhatWeGains():Observable<WhatWeGains[]>{
    return this.httpclient.get<WhatWeGains[]>(this.baseURLGains)
  }

  // get all Achieve
  getAchieve():Observable<Achieve[]>{
    return this.httpclient.get<Achieve[]>(this.baseURLAchieve)
  }



  
 
}
