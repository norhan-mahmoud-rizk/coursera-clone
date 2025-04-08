import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';

@Component({
  selector: 'app-career-course-details',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './career-course-details.component.html',
  styleUrl: './career-course-details.component.scss'
})
export class CareerCourseDetailsComponent implements OnInit {



    CareerCourse: ICareerCourses | undefined = undefined;
    CourseId: string = '';
    SimilarCourses: ICareerCourses[] = []; // To store similar courses
    visibleCoursesCount:number=4;
    constructor(
      private CourseService: ServiceWithApiService,
      private activatedroute: ActivatedRoute
    ) {}
  
    ngOnInit(): void {
      this.CourseId = this.activatedroute.snapshot.paramMap.get('CourseId')
        ? String(this.activatedroute.snapshot.paramMap.get('CourseId'))
        : '';
  
        
      this.GetCareerCourseById();
      // this.GetSimilarCourses();
    }
  
  
    GetCareerCourseById() {
      this.CourseService.getCarerrCourseById(this.CourseId).subscribe({
        next: (data) => {
          this.CareerCourse = data;
          console.log('Current course:', this.CareerCourse);
  
          //call GetSimilarCourses() function here not in the function of OnInit is was to ensure that you only fetch the similar courses after successfully fetching the current course's details  and because the categoryID required for GetSimilarCourses() might not be available immediately when the ngOnInit() method runs
          this.GetSimilarCourses();
        },
        error: (err) => {
          console.error('Error fetching career course:', err);
        },
      });
    }
  
    GetSimilarCourses() {
      if (this.CareerCourse?.categoryID) {
        const categoryID = Number(this.CareerCourse?.categoryID);
        console.log('the category id of the current course :', categoryID);
        this.CourseService.getCourseByCatId(categoryID).subscribe({
          next: (courses) => {
            console.log('courses with the same category Id:', courses);
            this.SimilarCourses = courses; 
          },
          error: (err) => {
            console.error( err);
          },
        });
      }
    }

}
