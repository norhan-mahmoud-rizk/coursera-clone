import { Routes } from '@angular/router';
import { OnlineDegreesComponent } from './Components/online-degrees/online-degrees.component';
import { CareerParentComponent } from './Components/career-parent/career-parent.component';
import { CareerCourseDetailsComponent } from './Components/career-course-details/career-course-details.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { HomeComponent } from './Components/home/home.component';
import { HomeDetalisComponent } from './Components/home-detalis/home-detalis.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
  // Default route to LandingPageComponent without navbar and footer
  { path: '', component: LandingPageComponent, title: "LandingPage" },

  // Parent route for the Main Layout with navbar and footer
  {
    path: '',
    component: MainLayoutComponent, // Parent component with navbar and footer
    children: [
      { path: 'home', component: HomeComponent, title: "Home" },
      { path: 'onlinedegree', component: OnlineDegreesComponent, title: 'Online Degree' },
      { path: 'profile', component: ProfileComponent, title: 'Profile' },
      { path: 'careercourses', component: CareerParentComponent, title: 'Career Courses' },
      { path: 'homeDetails/:id', component: HomeDetalisComponent, title: "Home Details" },
      { path: 'courseDetails/:CourseId', component: CareerCourseDetailsComponent, title: 'Course Details' },
    ]
  }
];
