import { Component, OnInit } from '@angular/core';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { HomeDetalisComponent } from '../home-detalis/home-detalis.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-learning',
  imports: [ FormsModule, CommonModule,RouterLink],
  templateUrl: './my-learning.component.html',
  styleUrl: './my-learning.component.scss'
})
export class MyLearningComponent implements OnInit {
  enrolledCourses: ICareerCourses[] = [];

  ngOnInit(): void {
    this.enrolledCourses = HomeDetalisComponent.getMyCourses(); //  Get the enrolled courses from HomeDetalisComponent
    console.log(' My learning list:', this.enrolledCourses);
  }
}
