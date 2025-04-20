import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { GroupOfCoursesComponent } from "../group-of-courses/group-of-courses.component";
import { ExploreCourseraComponent } from "../explore-coursera/explore-coursera.component";

import { CoursesGroupService } from '../../Services/courses-group.service';
import { ExploreCourseraService } from '../../Services/explore-coursera.service';
import { AuthService } from '../../Services/auth.service';

import { Iuser } from '../../Models/iuser';
import { Cards } from '../../Models/cards';
import { ExploreCoursera } from '../../Models/explore-coursera';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    GroupOfCoursesComponent,
    ExploreCourseraComponent,
    CommonModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  courses: Cards[] = [];
  herder: string = '';
  title: string = '';
  supTitle: string = '';
  exploreCourses: ExploreCoursera[] = [];

  // Login variables
  loginEmail: string = '';
  loginPassword: string = '';

  // Register object
  registerUser: Iuser = {
    id: '',
    name: '',
    email: '',
    password: '',
    address: '',
    myLearning: [],
    completed: [],
  };

  constructor(
    private coursesGroupService: CoursesGroupService,
    private exploreCourseraService: ExploreCourseraService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If already logged in, redirect to /home
    if (this.authService.getToken()) {
      this.router.navigate(['/home']);
      return;
    }

    this.coursesGroupService.getCoursesGroups().subscribe((data) => {
      this.courses = data.courses;
      this.herder = data.herder;
      this.title = data.title;
      this.supTitle = data.supTitle;
    });

    this.exploreCourseraService.fetchCourses().subscribe((data) => {
      this.exploreCourses = data;
    });
  }

  login() {
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.authService.setToken(users[0]);
          this.router.navigate(['/home']);
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Login failed');
      },
    });
  }

  register() {
    this.authService.register(this.registerUser).subscribe({
      next: (user) => {
        this.authService.setToken(user);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed');
      },
    });
  }
}
