import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-payment-page',
  imports: [],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss'
})
export class PaymentPageComponent implements OnInit {
 CareerCourse: ICareerCourses | undefined = undefined;
    CourseId: string = '';
    userData:any;//get the current user 
  constructor(public authService: AuthService, private router: Router,    private CourseService: ServiceWithApiService,
        private activatedroute: ActivatedRoute,public userService:UserServiceService) { }
  ngOnInit(): void {
// get the user by token 
    this.userService.getUserById().subscribe((res: any) => {
    // console.log(" Current  user form the career page :", res);
    this.userData = res.data; //here will be the user
  });

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
    next: (res: any) => {
      this.CareerCourse = {
        ...res.data,
        id: res.data._id, // لو عايزة id بدل _id
      };
      console.log('Parsed course object:', this.CareerCourse);
     
    },
    error: (err) => {
      console.error('Error fetching career course:', err);
    },
  });
}
}
