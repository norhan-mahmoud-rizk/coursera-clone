import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-explanation',
  imports: [CommonModule],
  templateUrl: './course-explanation.component.html',
  styleUrl: './course-explanation.component.scss'
})
export class CourseExplanationComponent implements OnInit {
  selectedSection = 'module1'; 
  isMaterialCollapsed = true; 
  CourseId: string = '';
  CareerCourse:ICareerCourses| undefined = undefined;
 constructor( 
    private CourseService: ServiceWithApiService,
       private activatedroute: ActivatedRoute) {}
  ngOnInit(): void {
    this.CourseId = this.activatedroute.snapshot.paramMap.get('CourseId')
    ? String(this.activatedroute.snapshot.paramMap.get('CourseId'))
    : '';
     console.log(this.CourseId);
    
   this.GetCareerCourseById() 
  }

  toggleCourseMaterial() {
    this.isMaterialCollapsed = !this.isMaterialCollapsed;
  }

  GetCareerCourseById() {
    this.CourseService.getCarerrCourseById(this.CourseId).subscribe({
      next: (data) => {
        this.CareerCourse = data;
        console.log( this.CareerCourse);

      
      },
      error: (err) => {
        console.error('Error fetching career course:', err);
      },
    });
  }
  

}
