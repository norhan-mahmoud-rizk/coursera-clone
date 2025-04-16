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
  logoImage: string;
  organization: string;
  views: number;        
  reviews: number;       
  enrolled: number;   
  relatedCourses: {
    RelatedCourseID: string;
    name: string;
    imgUrl: string;
  }[];
  modules: {
    id: string;
    moduleTitle: string;
    duration: string;
    videos: {
      title: string;
      videos: {
        videoID: string;
        videoTitle: string;
        url: string; 
        duration: string; 
      }[]; 
    }[];
  }[];
}
