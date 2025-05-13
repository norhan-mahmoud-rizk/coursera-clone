import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-career',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent implements OnInit{

    filteredList: ICareerCourses[] = [];
    visibleCoursesCount: number = 8;
  
    constructor(public courseServiceWithApi: ServiceWithApiService,public userService:UserServiceService) {}
  
    ngOnInit(): void {
  
      this.fetchAllCareerCourses();
  
  this.userService.getUserById().subscribe({
    next: (user) => {
      console.log(' Current user form the career page :', user);
    },
    error: (err) => {
      console.error(' Failed to fetch user from token:', err);
    }
  });
    }
  
    fetchAllCareerCourses() {
      this.courseServiceWithApi.GetAllCareerCourses().subscribe({
        next: (data) => {
          this.filteredList = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
    @Input() set filtervalue(categoryID: string) {
      if (categoryID === '')
      {
        this.fetchAllCareerCourses();
      } else {
       
        let parsedCategoryID = Number(categoryID);
        this.courseServiceWithApi.getCourseByCatId(parsedCategoryID).subscribe({
          next: (data) => {
            this.filteredList = data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
  
    showMore8() {
      this.visibleCoursesCount += 8;
    }
 
}
