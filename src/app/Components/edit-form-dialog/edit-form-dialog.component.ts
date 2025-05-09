import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-form-dialog',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './edit-form-dialog.component.html',
  styleUrl: './edit-form-dialog.component.scss'
})
export class EditFormDialogComponent {
  userName: string | null = null;//to display the username  of the user i make it string or null and the html file i check first by ngif beacuse of the null the value null that i eneterd 
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.username) {
      this.userName = currentUser.username;
    }
  }
}
