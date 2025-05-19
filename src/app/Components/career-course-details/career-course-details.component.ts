import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';

@Component({
  selector: 'app-career-course-details',
  imports: [CommonModule, FormsModule,RouterLink,EnrollDialogComponent],
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
      private activatedroute: ActivatedRoute,
      private router:Router
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
    next: (res: any) => {
     
      const cleanRelatedCourses = res.data.relatedCourses?.map((course: any) => ({
        relatedCourseID: course._doc?.relatedCourseID ?? course.relatedCourseID,
    name: course._doc?.name?.en ?? course.name?.en ?? 'No Name',

        relatedImage: course._doc?.relatedImage ?? course.relatedImage,
        _id: course._doc?._id ?? course._id,
      })) ?? [];

      this.CareerCourse = {
        ...res.data,
        id: res.data._id,
        relatedCourses: cleanRelatedCourses,
        categoryID: res.data.categoryID,
      };

      console.log('Parsed course object:', this.CareerCourse);
      this.GetSimilarCourses();
    },
    error: (err) => {
      console.error('Error fetching career course:', err);
    },
  });
}



  
 GetSimilarCourses() {
  if (this.CareerCourse?.categoryID) {
    const categoryID = this.CareerCourse.categoryID;
    // const currentCourseId = this.CareerCourse.id;//to exclude the current course from the similar courses

    console.log('the category id of the current course:', categoryID);

    this.CourseService.getCourseByCatId(categoryID).subscribe({
      next: (data) => {
        const courses = (data as any).courses;
        // to exclude the current course from the similar courses
        this.SimilarCourses = courses;

        console.log(' Similar courses (excluding current):', this.SimilarCourses);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}


    goToHomeDetails(CourseID: string | undefined) {
      if (!CourseID) return; 
      this.router.navigate(['/homeDetails', CourseID]);
    }
    


}
