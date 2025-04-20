
import { ICareerCourses } from "./ICareerCourses";

export interface Iuser {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
  
    myLearning: ICareerCourses[]; // Array of course IDs
    completed:  ICareerCourses[]; // Array of course IDs

    token?: string;

}
