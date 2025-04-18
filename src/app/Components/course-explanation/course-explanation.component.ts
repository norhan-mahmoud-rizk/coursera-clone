import { Component, OnInit } from '@angular/core';

import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-explanation',
  templateUrl: './course-explanation.component.html',
  imports: [
    CommonModule,
  ],
  styleUrls: ['./course-explanation.component.scss']
})
export class CourseExplanationComponent implements OnInit {
  selectedSection: string | null = null;
  isMaterialCollapsed = true;
  CourseId: string = '';
  CareerCourse: ICareerCourses | undefined = undefined;
  isCollapsed = true;


  constructor(
    private CourseService: ServiceWithApiService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    
  ) {}

  ngOnInit(): void {
    this.CourseId = this.activatedroute.snapshot.paramMap.get('CourseId')
      ? String(this.activatedroute.snapshot.paramMap.get('CourseId'))
      : '';
    this.GetCareerCourseById();

  }

  toggleCourseMaterial() {
    this.isMaterialCollapsed = !this.isMaterialCollapsed;
  }

  GetCareerCourseById() {
    this.CourseService.getCarerrCourseById(this.CourseId).subscribe({
      next: (data) => {
        this.CareerCourse = data;
        console.log(this.CareerCourse);
        

        // to make the first module to be the default 
        if (this.CareerCourse?.modules?.length > 0) {
          this.selectedSection = this.CareerCourse.modules[0].moduleTitle; //to display the title of the module as default 

        }
      },
      error: (err) => {
        console.error('Error fetching career course:', err);
      },
    });
  }
  playVideo(moduleTitle: string, videoGroupTitle: string, video: any) {
    this.router.navigate(
      [`/courseExplanation/${this.CourseId}/video-player`],
      {
        state: {
          course: this.CareerCourse,
          moduleTitle: videoGroupTitle,
          video: video
        }
      }
    );
  }

}
