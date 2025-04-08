import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../Services/api.service';
import { HomeCard } from '../../Models/home-card';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{

  filterArray: HomeCard[] = [];
  visibleCount = 4;
  visibleCount2=4;
  visibleCount3=4;
  visibleCount4=4;
  visibleCount5=4;





  constructor(
    private api:ApiService,
    private router: Router
  ){}



  ngOnInit(): void {
    this.api.getAllProduct().subscribe(
      data => {
        console.log('Data received from API:', data);
        this.filterArray = data;
      }
    );
  }
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



  goToDetails(prodId: number) {
    this.router.navigate(['/homeDetails', prodId]);
  }


}
