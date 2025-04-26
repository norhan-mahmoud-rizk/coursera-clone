export interface Course {
  image: string;
  title: string;
}

export interface Instructors {
  id: string;
  Name: string;
  Image: string;
  job: string;
  coursesTitle: string[];
  SocialMedia: string;
  description: string;
  course: string[];
  CoursesEnglish: Course[];
}
