import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  imports: [],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss'
})
export class PaymentPageComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to landing page the default route after logout
  }

}
