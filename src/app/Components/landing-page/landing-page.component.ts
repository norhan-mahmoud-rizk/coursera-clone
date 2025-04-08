import { Component, OnInit } from '@angular/core';
import { GroupOfCoursesComponent } from "../group-of-courses/group-of-courses.component";

import { CoursesGroupService } from '../../Services/courses-group.service';
import { ExploreCourseraComponent } from "../explore-coursera/explore-coursera.component";
import { ExploreCourseraService } from '../../Services/explore-coursera.service';

import { CommonModule } from '@angular/common';
import { Cards } from '../../Models/cards';
import { ExploreCoursera } from '../../Models/explore-coursera';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [GroupOfCoursesComponent, ExploreCourseraComponent,CommonModule,RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {
  courses:Cards[] = [];
  herder:string = ''
  title:string = ''
  supTitle:string = ''
  exploreCourses: ExploreCoursera[] = [];
  constructor(private coursesGroupService: CoursesGroupService ,private exploreCourseraService: ExploreCourseraService){}

  ngOnInit(): void {
    this.coursesGroupService.getCoursesGroups().subscribe((data) => {
      console.log(data);
      this.courses = data.courses;
      this.herder = data.herder;
      this.title = data.title;
      this.supTitle = data.supTitle;
    })
    this.exploreCourseraService.fetchCourses().subscribe((data) => {
      console.log(data);

      this.exploreCourses = data
    })

  }
}
