import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-home-detalis',
  imports: [RouterModule],
  templateUrl: './home-detalis.component.html',
  styleUrl: './home-detalis.component.scss'
})
export class HomeDetalisComponent implements OnInit {
  productID!: number;
  getID!: ICareerCourses | undefined;

  //  Static array to hold enrolled courses
  static myCourses: ICareerCourses[] = [];

  constructor(
    private route: ActivatedRoute,
    private active: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.active.paramMap.subscribe(par => {
      this.productID = Number(par.get('id')) || 0;
      this.api.getByID(String(this.productID)).subscribe({
        next: (data) => {
          this.getID = data;
          console.log(this.getID);
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    });
  }

  enrollCourse(): void {
    if (this.getID) {
      const exists = HomeDetalisComponent.myCourses.some(c => c.id === this.getID!.id);
      if (!exists) {
        HomeDetalisComponent.myCourses.push(this.getID);
      }
      this.router.navigate(['/my learning']); //  Navigate after adding
    }
  }
  
  //  This method is used to get the enrolled courses in My Learning component
  static getMyCourses(): ICareerCourses[] {
    return HomeDetalisComponent.myCourses;
  }
}
