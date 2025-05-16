import { Component, OnInit } from '@angular/core';

import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CoursesService } from '../../Services/courses.service';
import { CourseData } from '../../Models/course-details';
import { map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-course-explanation',
  templateUrl: './course-explanation.component.html',
  imports: [RouterLink, CommonModule, NavbarComponent],
  styleUrls: ['./course-explanation.component.scss'],
})
export class CourseExplanationComponent {
  id: string = '';
  courseDetails?: CourseData;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {
    this.route.params
      .pipe(
        map((params) => params['id']),
        switchMap((id) => this.coursesService.getCourseDetails(id)),
        tap((courseDetails) => {
          this.courseDetails = courseDetails;
          this.id = courseDetails._id;
        })
      )
      .subscribe();
  }

  toggleArrow() {
    const arrow = document.getElementById('arrow');
    if (arrow) {
      arrow.classList.toggle('rotate');
    }
  }
}
