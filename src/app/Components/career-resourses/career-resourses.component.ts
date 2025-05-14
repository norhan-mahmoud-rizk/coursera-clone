import { Component, OnInit } from '@angular/core';
import { CareerResoursesCategory } from '../../Models/career-resourses-category';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { CareerResourses } from '../../Models/career-resourses';

@Component({
  selector: 'app-career-resourses',
  imports: [],
  templateUrl: './career-resourses.component.html',
  styleUrl: './career-resourses.component.scss'
})
export class CareerResoursesComponent implements OnInit{
  CareerResourseCategory: CareerResoursesCategory[] = [];
    selectedCategory: string = ''; 
       CareerResourses: CareerResourses[] = [];
           visibleCoursesCount: number = 4;
  constructor(private courseServiceWithApi: ServiceWithApiService){}
  ngOnInit(): void {
  this.fetchCareerResoursesCategories();
  
      if (this.CareerResourseCategory.length > 0) {
        this.selectedCategory = this.CareerResourseCategory[0].CareerResourceCategory;
        this.fetchCareerResoureses(this.selectedCategory);
      }
  }


     fetchCareerResoursesCategories() {
      this.courseServiceWithApi.getCareerResoursesCategory().subscribe({
        next: (data) => {
          this.CareerResourseCategory = data;
          if (this.CareerResourseCategory.length > 0) {
            this.selectedCategory = this.CareerResourseCategory[0].CareerResourceCategory;
            this.fetchCareerResoureses(this.selectedCategory);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
    fetchCareerResoureses(CareerResourceCategor: string = '') {
      if (CareerResourceCategor === '') {
        this.courseServiceWithApi.GetAllCareerResourses().subscribe({
          next: (data) => {
            this.CareerResourses = data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.courseServiceWithApi.getCareerResoursesByCategory(CareerResourceCategor).subscribe({
          next: (data) => {
            this.CareerResourses = data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    }
  
    selectResours(selectValue: string) {
      this.selectedCategory = selectValue;
      this.fetchCareerResoureses(selectValue);
    }
  

    toggleShowMore() {
      if (this.visibleCoursesCount > 4) {
        this.visibleCoursesCount = 4;
      } else {
        this.visibleCoursesCount += 6;
      }
    }
}
