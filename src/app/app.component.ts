import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnlineDegreesComponent } from "./Components/online-degrees/online-degrees.component";
import { ProfileComponent } from "./Components/profile/profile.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OnlineDegreesComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Coursera-Clone-Angular';
}
