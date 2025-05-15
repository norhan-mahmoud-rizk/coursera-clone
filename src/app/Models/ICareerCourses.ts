export interface ICareerCourses {
 id: string;
  name: string;
  description: string;
  categoryID: string;
  courseImage: string;
  IfYouLike: string;
  IfYouLikeValue: string;
  SkillsNeeded: string;
  SkillsNeededValue: string;
  logoImage: string;
  organization: string;
  views: number;
  reviews: any[];
  enrolled: number;
  instructor:string;
  relatedCourses: {
    RelatedCourseID: string;
    name: string;
    imgUrl: string;
  }[];
 modules: string[];
    createdAt?: Date;
  updatedAt?: Date;
}