import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';

@Component({
  selector: 'app-career',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './career.component.html',
  styleUrl: './career.component.scss'
})
export class CareerComponent implements OnInit{

    filteredList: ICareerCourses[] = [];
    visibleCoursesCount: number = 8;
  
    constructor(public courseServiceWithApi: ServiceWithApiService) {}
  
    ngOnInit(): void {
  
      this.fetchAllCareerCourses();
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
