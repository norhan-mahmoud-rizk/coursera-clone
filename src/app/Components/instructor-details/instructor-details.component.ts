import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructors } from '../../Models/instructors';
import { InstructorsService } from '../../Services/instructors.service';
import { LandingPage } from '../../Models/landing-page';
import { AuthService } from '../../Services/auth.service';
import { LandingPageService } from '../../Services/landing-page.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { CoursesCategories } from '../../Models/CoursesCategories';

@Component({
  selector: 'app-instructor-details',
  imports: [NavbarComponent],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.scss'
})
export class InstructorDetailsComponent implements OnInit {

  instructorID!: string;  // غيرت النوع لـ string
  getInstructorID!: Instructors | undefined;
  ArrayData: LandingPage[] = [];
  filterArray: ICareerCourses[] = [];
  filterCategory: CoursesCategories[] = [];

  constructor(
    private api: InstructorsService,
    private active: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private loadin: LandingPageService,
    public courseServiceWithApi:ServiceWithApiService
  ){}

  ngOnInit(): void {

     this.courseServiceWithApi.GetAllCareerCourses().subscribe({
  next: (data) => {
    console.log('Data received from backend:', data);
    this.filterArray = data;
      // map _id to id
    this.filterArray = data.map((item: any) => ({
      ...item,
      id: item._id
    }));
  },
  error: (err) => {
    console.error('Error fetching data from backend:', err);
  }
});

    this.loadin.getAllData().subscribe(data => {
      this.ArrayData = data;
    });

    this.active.paramMap.subscribe(par => {
      this.instructorID = par.get('id') || '';  // خد ال id كسلسلة نصية string
      if(this.instructorID) {
        this.api.getInstructorID(this.instructorID).subscribe({
          next: (response: any) => {
            // لو الداتا جوه response.data
            const data = response.data || response;
            this.getInstructorID = {
              ...data,
              id: data._id || data.id,  // تحويل _id الى id لو موجود
            };
            console.log(this.getInstructorID);
          },
          error: (err) => {
            console.error('Error fetching Instructors:', err);
          }
        });
      }
    });




     this.courseServiceWithApi.getCareerCourseCategory().subscribe({
  next: (data) => {
    console.log('Data received from backend:', data);
    this.filterCategory = data;
      // map _id to id
    this.filterCategory = data.map((item: any) => ({
      ...item,
      id: item._id
    }));
  },
  error: (err) => {
    console.error('Error fetching data from backend:', err);
  }
});

  }

}