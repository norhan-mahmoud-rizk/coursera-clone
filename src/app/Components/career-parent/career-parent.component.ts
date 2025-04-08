import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CareerComponent } from '../career/career.component';
import { FormsModule } from '@angular/forms';
import { CareerResourses } from '../../Models/career-resourses';
import { CoursesCategories } from '../../Models/CoursesCategories';
import { CareerResoursesCategory } from '../../Models/career-resourses-category';
import { SucessStories } from '../../Models/sucess-stories';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
@Component({
  selector: 'app-career-parent',
  imports: [CareerComponent, CommonModule,FormsModule],
  templateUrl: './career-parent.component.html',
  styleUrl: './career-parent.component.scss'
})
export class CareerParentComponent  implements OnInit  {



    sendedValueFromParent: string = ''; 
    CareerResourses: CareerResourses[] = [];
    CareerCoursescategories: CoursesCategories[] = [];
    CareerResourseCategory: CareerResoursesCategory[] = [];
    selectedCategory: string = ''; 
    visibleCoursesCount: number = 4;
    SuccessStories: SucessStories[] = [];
    
    constructor(private courseServiceWithApi: ServiceWithApiService) {}
  
    ngOnInit(): void {
      this.fetchCareerCoursesCategories();
      this.fetchCareerResoursesCategories();
  
      if (this.CareerResourseCategory.length > 0) {
        this.selectedCategory = this.CareerResourseCategory[0].categoryID;
        this.fetchCareerResoureses(this.selectedCategory);
      }
  
      this.fetchAllSuccessStories();
    }
  
    fetchCareerCoursesCategories() {
      this.courseServiceWithApi.getCareerCourseCategory().subscribe({
        next: (data) => {
          this.CareerCoursescategories = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
    fetchCareerResoursesCategories() {
      this.courseServiceWithApi.getCareerResoursesCategory().subscribe({
        next: (data) => {
          this.CareerResourseCategory = data;
          if (this.CareerResourseCategory.length > 0) {
            this.selectedCategory = this.CareerResourseCategory[0].categoryID;
            this.fetchCareerResoureses(this.selectedCategory);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
    fetchCareerResoureses(categoryId: string = '') {
      if (categoryId === '') {
        this.courseServiceWithApi.GetAllCareerResourses().subscribe({
          next: (data) => {
            this.CareerResourses = data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else {
        this.courseServiceWithApi.getCareerResoursesByCategory(categoryId).subscribe({
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
  
    fetchAllSuccessStories() {
      this.courseServiceWithApi.GetAllSuccessStories().subscribe({
        next: (data) => {
          this.SuccessStories = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  
}
