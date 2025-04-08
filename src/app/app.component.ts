import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnlineDegreesComponent } from "./Components/online-degrees/online-degrees.component";
import { ProfileComponent } from "./Components/profile/profile.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { FooterComponent } from './Components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OnlineDegreesComponent, ProfileComponent, NavbarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Coursera-Clone-Angular';
}
