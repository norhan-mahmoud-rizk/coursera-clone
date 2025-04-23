

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ExploreCourseraComponent } from "../explore-coursera/explore-coursera.component";
import { GroupOfCoursesComponent } from "../group-of-courses/group-of-courses.component";

import { LandingPageService } from '../../Services/landing-page.service';
import { LandingPage } from '../../Models/landing-page';
import { ApiService } from '../../Services/api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { AuthService } from '../../Services/auth.service';
import { Iuser } from '../../Models/iuser';

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

  ArrayData: LandingPage[] = [];
  filterArray: ICareerCourses[] = [];
  visibleCount2 = 4;
  visibleCount = 4;
  visibleCount3 = 4;

  // Login & Register variables
  loginEmail: string = '';
  loginPassword: string = '';
  registerUser: Iuser = {} as Iuser;

  constructor(
    private loadin: LandingPageService,
    private api: ApiService,
    private router: Router,
    public authService: AuthService,
    
  ) {}

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigate(['/home']);
      return;
    }

    this.loadin.getAllData().subscribe(data => {
      this.ArrayData = data;
    });

    this.api.getAllProduct().subscribe(data => {
      this.filterArray = data;
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
      }
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
      }
    });
  }

  goToDetails(prodId: string) {
    this.router.navigate(['/homeDetails', prodId]);
  }

  showMoreCard2() { this.visibleCount2 += 8 }
  showfewerCard2() { this.visibleCount2 = 4 }

  showMoreCard() { this.visibleCount += 8 }
  showfewerCard() { this.visibleCount = 4 }

  showMoreCard3() { this.visibleCount3 += 8 }
  showfewerCard3() { this.visibleCount3 = 4 }

  gotohome() { this.router.navigate(['/home']) }

}
