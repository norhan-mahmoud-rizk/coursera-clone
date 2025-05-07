import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { Router } from '@angular/router';
import { Instructors } from '../../Models/instructors';
import { InstructorsService } from '../../Services/instructors.service';
import { EnrollDialogComponent } from '../enroll-dialog/enroll-dialog.component';

@Component({
  selector: 'app-home-detalis',
  imports: [RouterModule,EnrollDialogComponent],
  templateUrl: './home-detalis.component.html',
  styleUrl: './home-detalis.component.scss'
})
export class HomeDetalisComponent implements OnInit {
  productID!: number;
  getID!: ICareerCourses | undefined;
  getInstructor!: Instructors;

  // Static array to hold enrolled courses
  static myCourses: ICareerCourses[] = [];

  constructor(
    private route: ActivatedRoute,
    private active: ActivatedRoute,
    private api: ApiService,
    private instructorService: InstructorsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.active.paramMap.subscribe(par => {
      this.productID = Number(par.get('CourseId')) || 0;

      this.api.getByID(String(this.productID)).subscribe({
        next: (data) => {
          this.getID = data;
          console.log('Course Details:', this.getID);

          
          const instructorId = this.getID?.instructorID;
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
  }


  enrollCourse(): void {
    if (this.getID) {
      const exists = HomeDetalisComponent.myCourses.some(c => c.id === this.getID!.id);
      if (!exists) {
        HomeDetalisComponent.myCourses.push(this.getID);
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



  
}
