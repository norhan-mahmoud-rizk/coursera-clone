import { Component } from '@angular/core';
import { RightSidebarComponent } from '../right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from '../left-sidebar/left-sidebar.component';
import { MainContentComponent } from '../main-content/main-content.component';

@Component({
  selector: 'app-course-explanation',
  imports: [MainContentComponent, LeftSidebarComponent,RightSidebarComponent],
  templateUrl: './course-explanation.component.html',
  styleUrl: './course-explanation.component.scss'
})
export class CourseExplanationComponent {

}
