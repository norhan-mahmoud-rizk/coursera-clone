import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  // userName: string | null = null;//to display the username  of the user
 userData: any;
  constructor(public authService: AuthService, private router: Router,public userService :UserServiceService) {}
  ngOnInit(): void {
   this.userService.getUserById().subscribe((res: any) => {
    // console.log(" Current logged-in user form the career page :", res);
    this.userData = res.data; //here will be the user
  });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to landing page the default route after logout
  }
  goToHome(){
    this.router.navigate(['/home']);

  }
}
