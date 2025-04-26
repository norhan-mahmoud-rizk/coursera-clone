import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iuser } from '../../Models/iuser';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-register-form-dialog',
  templateUrl: './login-register-form-dialog.component.html',
  styleUrls: ['./login-register-form-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule],
})
export class LoginRegisterFormDialogComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  registerUser: Iuser = {} as Iuser;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.authService.setToken(users[0]);
          this.router.navigate(['/home']);
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Login failed');
      }
    });
  }

  register() {
    this.authService.register(this.registerUser).subscribe({
      next: (user) => {
        this.authService.setToken(user);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed');
      }
    });
  }
}
