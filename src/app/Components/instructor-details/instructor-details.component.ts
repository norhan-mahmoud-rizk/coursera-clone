import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructors } from '../../Models/instructors';
import { InstructorsService } from '../../Services/instructors.service';
import { LandingPage } from '../../Models/landing-page';
import { AuthService } from '../../Services/auth.service';
import { LandingPageService } from '../../Services/landing-page.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-instructor-details',
  imports: [NavbarComponent],
  templateUrl: './instructor-details.component.html',
  styleUrl: './instructor-details.component.scss'
})
export class InstructorDetailsComponent implements OnInit {

  instructorID!: string;  // غيرت النوع لـ string
  getInstructorID!: Instructors | undefined;
  ArrayData: LandingPage[] = [];

  constructor(
    private api: InstructorsService,
    private active: ActivatedRoute,
    public authService: AuthService,
    private router: Router,
    private loadin: LandingPageService,
  ){}

  ngOnInit(): void {

    this.loadin.getAllData().subscribe(data => {
      this.ArrayData = data;
    });

    this.active.paramMap.subscribe(par => {
      this.instructorID = par.get('id') || '';  // خد ال id كسلسلة نصية string
      if(this.instructorID) {
        this.api.getInstructorID(this.instructorID).subscribe({
          next: (response: any) => {
            // لو الداتا جوه response.data
            const data = response.data || response;
            this.getInstructorID = {
              ...data,
              id: data._id || data.id,  // تحويل _id الى id لو موجود
            };
            console.log(this.getInstructorID);
          },
          error: (err) => {
            console.error('Error fetching Instructors:', err);
          }
        });
      }
    });

  }

}