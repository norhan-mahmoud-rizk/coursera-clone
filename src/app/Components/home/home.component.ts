import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../Services/api.service';

import { CommonModule } from '@angular/common';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { ICareerCourses } from '../../Models/ICareerCourses';
import { ServiceWithApiService } from '../../Services/service-with-api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,RouterModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
filteredListfrombackend:ICareerCourses[]=[];
  filterArray: ICareerCourses[] = [];
  visibleCount = 4;
  visibleCount2=4;
  visibleCount3=4;
  visibleCount4=4;
  visibleCount5=4;





  constructor(
    private api:ApiService,
    private router: Router,
    public courseServiceWithApi:ServiceWithApiService,
       private translate: TranslateService
  ){
     this.router.events.subscribe(event => {
    if (event instanceof NavigationStart) {
      console.log('Navigation started:', event.url);
    }
    if (event instanceof NavigationEnd) {
      console.log('Navigation ended:', event.url);
    }
  });
  }

  ngOnInit(): void {
    // this.api.getAllProduct().subscribe(
    //   data => {
    //     console.log('Data received from API:', data);
    //     this.filterArray = data;
    //   }
    // );


  this.courseServiceWithApi.GetAllCareerCourses().subscribe({
  next: (data) => {
    console.log('Data received from backend:', data);
    this.filterArray = data;
      // map _id to id
    this.filterArray = data.map((item: any) => ({
      ...item,
      id: item._id
    }));
  },
  error: (err) => {
    console.error('Error fetching data from backend:', err);
  }
});

  }


  // get the data from the backend

    // fetchAllCareerCoursesFromBackend() {
    //   this.courseServiceWithApi.GetAllCareerCoursesBybackend().subscribe({
    //     next: (data) => {
    //       this.filteredListfrombackend = data;
    //       console.log("the data from backend is in the home page ",data)
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     }
    //   });
    // }
  showMore(): void {
    this.visibleCount += 4;
  }
  showfewer(){
    this.visibleCount=4;
  }

  showMoreCard2(){
    this.visibleCount2+=4
  }
  showfewerCard2(){
    this.visibleCount2=4
  }

  showMoreCard3(){
    this.visibleCount3 += 4
  }
  showfewerCard3(){
    this.visibleCount3 = 4
  }

  showMoreCard4(){
    this.visibleCount4 += 4
  }
  showfewerCard4(){
    this.visibleCount4 = 4
  }

  showMoreCard5(){
    this.visibleCount5 += 4
  }
  showfewerCard5(){
    this.visibleCount5 = 4
  }



  goToDetails(prodId: string) {
    console.log('Navigating to details for:', prodId);
    this.router.navigate(['/homeDetails', prodId]);
  }


}