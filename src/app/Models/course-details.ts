export interface CourseData {
  _id: string;
  instructor: string;
  name: string;
  categoryID: string;
  IfYouLike: string;
  IfYouLikeValue: string;
  SkillsNeeded: string;
  SkillsNeededValue: string;
  logoImage: string;
  organization: string;
  views: number;
  enrolled: boolean;
  modules: Module[];
  description: string;
  reviews: any[]; // You can define a Review interface if needed
  courseImage: string;
  relatedCourses: any[]; // You can define a RelatedCourse interface if needed
  createdAt: string;
  updatedAt: string;
  courseId: number;
  isCompleted: boolean;
  completionDate: string | null;
  lastAccessed: string;
}

export interface Module {
  _id: string;
  moduleTitle: string;
  duration: string;
  topics: Topic[];
  isCompleted: boolean;
}

export interface Topic {
  _id: string;
  title: string;
  description: string;
  videos: Video[];
  assignments: Assignment[];
  isCompleted: boolean;
}

export interface Video {
  _id: string;
  videoTitle: string;
  url: string;
  transeScript: string;
  discuseion: string;
  duration: string;
  isCompleted: boolean;
}

export interface Assignment {
  _id: string;
  buffer: {
    type: string;
    data: number[];
  };
  isCompleted: boolean;
  score: number | null;
  submittedOn: string | null;
}
