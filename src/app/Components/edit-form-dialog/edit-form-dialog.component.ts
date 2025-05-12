import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-edit-form-dialog',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './edit-form-dialog.component.html',
  styleUrl: './edit-form-dialog.component.scss'
})
export class EditFormDialogComponent {
  // userName: string | null = null;//to display the username  of the user i make it string or null and the html file i check first by ngif beacuse of the null the value null that i eneterd 
  userData:any;
  constructor(public authService: AuthService, private router: Router,public userService:UserServiceService) {}
  ngOnInit(): void {
     this.userService.getUserById().subscribe((res: any) => {
    console.log("✅ Current logged-in user form the career page :", res);
    this.userData = res.data; // <-- هنا بنخزن اليوزر
  });
  }
}
