import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CourseData } from '../Models/course-details';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  getCourseDetails(id: string): Observable<CourseData> {
    console.log('Fetching course details for ID:', id);

    return this.httpClient
      .get<CourseData>(`${environment.backendURL}/progress/course/${id}`)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }
}
