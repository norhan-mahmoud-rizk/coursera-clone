import { ICareerCourses } from "./ICareerCourses";

export interface Iuser {
  id?: string;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  dob?: Date;
  role?: string;
  code?: string;
  codeExpires?: Date;
  isConfirmed?: boolean;
  isDeleted?: boolean;
  // address?: string;
  // myLearning?: ICareerCourses[];
  progress?: {
    progressCourses: Array<{
      courseId?: string;
      name?: string;
      passedModules?: Array<{
        moduleId?: string;
        name?: string;
        passedTopics?: Array<{
          topicId?: string;
          name?: string;
          passedSubTopics?: Array<{
            subTopicId?: string;
            name?: string;
          }>;
        }>;
      }>;
    }>;
  };
  createdAt?: Date;
  updatedAt?: Date;
}