import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar2',
  imports: [RouterModule],
  templateUrl: './navbar2.component.html',
  styleUrl: './navbar2.component.scss'
})
export class Navbar2Component {

   constructor(public authService: AuthService, private router: Router) {}


}
