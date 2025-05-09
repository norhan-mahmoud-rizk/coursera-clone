import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule],
})
export class ConfirmEmailComponent {
  email: string = '';
  code: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.confirmEmail(this.email, this.code).subscribe({
      next: (response) => {
        // Save token
        this.authService.setToken(response.userToken);

        // Set dummy user
        const dummyUser = {
          username: this.email.split('@')[0],
          email: this.email
        };
        this.authService.setCurrentUser(dummyUser);

        // Navigate to home
        alert('✅ Email confirmed successfully!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Failed to confirm email.';
      }
    });
  }
}