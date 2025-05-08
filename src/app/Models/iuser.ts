
import { ICareerCourses } from "./ICareerCourses";

export interface Iuser {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
  
    myLearning: ICareerCourses[]; 
    completed:  ICareerCourses[];

    token?: string;

}
