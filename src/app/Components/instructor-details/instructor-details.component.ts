import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';
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

  instructortID!: number;
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
      this.instructortID = Number(par.get('id')) || 0;
      this.api.getInstructorID(String(this.instructortID)).subscribe({
        next: (data) => {
          this.getInstructorID = data;
          console.log(this.getInstructorID);
        },
        error: (err) => {
          console.error('Error fetching Instructors:', err);
        }
      });
    });

  }


}