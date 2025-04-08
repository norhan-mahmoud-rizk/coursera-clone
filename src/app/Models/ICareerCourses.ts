export interface ICareerCourses {
    id: string;
    name: string;
    description: string;
    categoryID: number;
    imgUrl: string;
    IfYouLike: string;
    IfYouLikeValue: string;
    SkillsNeeded: string;
    SkillsNeededValue: string;
    relatedCourses: {
      RelatedCourseID: string;
      name: string;
      imgUrl: string;
    }[];  
  }