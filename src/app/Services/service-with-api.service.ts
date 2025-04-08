import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

import { Observable } from 'rxjs';
import { ICareerCourses } from '../Models/ICareerCourses';
import { CoursesCategories } from '../Models/CoursesCategories';
import { CareerResourses } from '../Models/career-resourses';
import { CareerResoursesCategory } from '../Models/career-resourses-category';
import { SucessStories } from '../Models/sucess-stories';


@Injectable({
  providedIn: 'root'
})
export class ServiceWithApiService {
  httpheaders={};
  constructor(public httpclient:HttpClient) {

   
    this.httpheaders={
      Headers:new HttpHeaders({'content-type':'application/json'})    }
   }

  
  baseURLCareerCourse:string=`${environment.baseURL}/CareerCourses`;
  baseURLCareerCourseCategory:string=`${environment.baseURL}/CareerCourseCategories`;
  baseURLcareerResources:string=`${environment.baseURL}/careerResources`;
  baseURLcareerResourceCategories:string=`${environment.baseURL}/careerResourceCategories`;
  baseURLsuccessStories:string=`${environment.baseURL}/successStories`;


  // /get all career courses
  GetAllCareerCourses(): Observable<ICareerCourses[]> {
    return this.httpclient.get<ICareerCourses[]>(this.baseURLCareerCourse);
  }
// get course by id
getCarerrCourseById(CourseId: string): Observable<ICareerCourses> {
    return this.httpclient.get<ICareerCourses>(`${this.baseURLCareerCourse}/${CourseId}`);
  }

// get all catgories of career courses
  getCareerCourseCategory(): Observable<CoursesCategories[]> {
    return this.httpclient.get<CoursesCategories[]>(this.baseURLCareerCourseCategory);
  }
  
  // query string to search by cat Id

  getCourseByCatId(catValu:number):Observable<ICareerCourses[]> {
    return this.httpclient.get<ICareerCourses[]>(`${this.baseURLCareerCourse}?categoryID=${catValu}`);
  }

  GetAllCareerResourses(): Observable<CareerResourses[]> {
    return this.httpclient.get<CareerResourses[]>(this.baseURLcareerResources);
  }

  // Get categories for career resources
  getCareerResoursesCategory(): Observable<CareerResoursesCategory[]> {
    return this.httpclient.get<CareerResoursesCategory[]>(`${environment.baseURL}/careerResourceCategories`);
  }

  // Get career resources filtered by category
  getCareerResoursesByCategory(categoryID: string): Observable<CareerResourses[]> {
    return this.httpclient.get<CareerResourses[]>(`${this.baseURLcareerResources}?categoryID=${categoryID}`);
  }

  // get all success stories 
   GetAllSuccessStories():Observable<SucessStories[]>{
    return this.httpclient.get<SucessStories[]>(`${this.baseURLsuccessStories}`)
   }



 
  
 
}
