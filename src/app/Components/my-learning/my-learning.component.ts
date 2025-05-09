import { Component, OnInit } from '@angular/core';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { HomeDetalisComponent } from '../home-detalis/home-detalis.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-my-learning',
  imports: [ FormsModule, CommonModule,RouterLink],
  templateUrl: './my-learning.component.html',
  styleUrl: './my-learning.component.scss'
})
export class MyLearningComponent implements OnInit {
  enrolledCourses: ICareerCourses[] = [];
  userName: string | null = null;//to display the username  of the user 
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.enrolledCourses = HomeDetalisComponent.getMyCourses(); //  Get the enrolled courses from HomeDetalisComponent
    console.log(' My learning list:', this.enrolledCourses);


    // display the first character of the user
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.username) {
      this.userName = currentUser.username;
    }
  }
}
