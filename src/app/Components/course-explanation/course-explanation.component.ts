import { Component, OnInit } from '@angular/core';

import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-course-explanation',
  templateUrl: './course-explanation.component.html',
  imports: [
    RouterLink,
    CommonModule,
    NavbarComponent
  ],
  styleUrls: ['./course-explanation.component.scss']
})
export class CourseExplanationComponent  {
 
toggleArrow() {
  const arrow = document.getElementById('arrow');
  if (arrow) {
    arrow.classList.toggle('rotate');
  }
}



}
