import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';

@Component({
  selector: 'app-payment-page',
  imports: [],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss'
})
export class PaymentPageComponent implements OnInit {
 CareerCourse: ICareerCourses | undefined = undefined;
    CourseId: string = '';
  constructor(public authService: AuthService, private router: Router,    private CourseService: ServiceWithApiService,
        private activatedroute: ActivatedRoute,) { }
  ngOnInit(): void {


    // Initialization logic can go here if needed

    this.CourseId = this.activatedroute.snapshot.paramMap.get('CourseId')
    ? String(this.activatedroute.snapshot.paramMap.get('CourseId'))
    : '';

    
  this.GetCareerCourseById();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to landing page the default route after logout
  }


  GetCareerCourseById() {
    this.CourseService.getCarerrCourseById(this.CourseId).subscribe({
      next: (data) => {
        this.CareerCourse = data;
        console.log('Current course from the payment component:', this.CareerCourse);

       
      },
      error: (err) => {
        console.error('Error fetching career course:', err);
      },
    });
  }
}
