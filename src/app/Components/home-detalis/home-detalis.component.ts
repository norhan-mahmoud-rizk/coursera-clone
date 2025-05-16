import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
// import { ApiService } from '../../Services/api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { Router } from '@angular/router';
import { Instructors } from '../../Models/instructors';
import { InstructorsService } from '../../Services/instructors.service';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';
import { Navbar2Component } from '../navbar2/navbar2.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ServiceWithApiService } from '../../Services/service-with-api.service';

@Component({
  selector: 'app-home-detalis',
  imports: [RouterModule,EnrollDialogComponent,NavbarComponent],
  templateUrl: './home-detalis.component.html',
  styleUrl: './home-detalis.component.scss'
})
export class HomeDetalisComponent implements OnInit {
   CareerCourse: ICareerCourses | undefined = undefined;
    CourseId: string = '';
  getInstructor!: Instructors;

  // Static array to hold enrolled courses
  static myCourses: ICareerCourses[] = [];

  constructor(
    private route: ActivatedRoute,
    private active: ActivatedRoute,
    // private api: ApiService,
    private instructorService: InstructorsService,
    private router: Router,
    public courseServiceWithApi:ServiceWithApiService
  ) {}

  ngOnInit(): void {
    this.active.paramMap.subscribe(par => {
     this.CourseId = this.active.snapshot.paramMap.get('CourseId')
        ? String(this.active.snapshot.paramMap.get('CourseId'))
        : '';
      this.courseServiceWithApi.getCarerrCourseById(this.CourseId).subscribe({
        next: (data) => {
          this.CareerCourse = data;
          console.log('Course Details:', this.CareerCourse);


          const instructorId = this.CareerCourse?.instructor;
          if (instructorId) {
            this.instructorService.getInstructorID(instructorId).subscribe({
              next: (instructorData) => {
                this.getInstructor = instructorData;
                console.log('Instructor:', this.getInstructor);
              },
              error: (err) => {
                console.error('Error fetching instructor:', err);
              }
            });
          }
        },
        error: (err) => {
          console.error('Error fetching course:', err);
        }
      });
    });


   this.GetCareerCourseById()
  }


  enrollCourse(): void {
    if (this.CareerCourse) {
      const exists = HomeDetalisComponent.myCourses.some(c => c.id === this.CareerCourse!.id);
      if (!exists) {
        HomeDetalisComponent.myCourses.push(this.CareerCourse);
      }
      this.router.navigate(['/my learning']);
    }
  }

  static getMyCourses(): ICareerCourses[] {
    return HomeDetalisComponent.myCourses;
  }

  instructorDitals(id: string | undefined): void {
    this.router.navigate(['/instructoeDetails', id]);
  }

GetCareerCourseById() {
  this.courseServiceWithApi.getCarerrCourseById(this.CourseId).subscribe({
    next: (res: any) => {
      this.CareerCourse = {
        ...res.data,
        id: res.data._id, 
      };
      console.log(' course object from the home details is :', this.CareerCourse);
    
    },
    error: (err) => {
      console.error('Error fetching career course:', err);
    },
  });
}


}