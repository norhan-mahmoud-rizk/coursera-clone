import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Iuser } from '../../Models/iuser';

@Component({
  selector: 'app-login-register-form-dialog',
  templateUrl: './login-register-form-dialog.component.html',
  styleUrls: ['./login-register-form-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginRegisterFormDialogComponent {
  loginEmail: string = '';
  loginPassword: string = '';

  registerUser: Iuser = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    dob: new Date(),
    address: '',
    myLearning: [],
    progress: {
      progressCourses: []
    }
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.loginEmail, this.loginPassword).subscribe({
      next: (response) => {
        this.authService.setToken(response.userToken); // Save JWT

        const dummyUser: Iuser = {
          username: this.loginEmail.split('@')[0],
          email: this.loginEmail,
          password: '',
          firstName: '',
          lastName: '',
          address: '',
          myLearning: [],
          progress: {
            progressCourses: []
          }
        };
        this.authService.setCurrentUser(dummyUser);

        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Invalid email or password');
        console.error(err);
      }
    });
  }

  register() {
    this.authService.register(this.registerUser).subscribe({
      next: (response) => {
        alert('Registration successful! Please check your email for a confirmation code.');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration error:', err);

        if (err.status === 409) {
          alert(`This email is already taken. Try logging in.`);
        } else if (err.status === 400) {
          alert('Please fill out all required fields correctly.');
        } else {
          alert('Something went wrong. Please try again later.');
        }
      }
    });
  }
}