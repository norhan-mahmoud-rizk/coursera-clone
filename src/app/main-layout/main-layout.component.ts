import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../Components/navbar/navbar.component';
import { FooterComponent } from '../Components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,NavbarComponent,FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

}
