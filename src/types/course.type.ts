import { createCourseSchema } from "@/schemas/course.schema";
import { z } from "zod";

// src/types.ts
export interface Lesson {
  _id: string;
  name: string;
  content: string;
  type: string;
  isAccessible: boolean;
  isCompleted: boolean;
  completedAt: string | null;
}

export interface Topic {
  _id: string;
  name: string;
  description: string;
  lessons: Lesson[];
}

export interface Subject {
  _id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  subjects: Subject[];
}

export interface IPopulatedStudentCourse {
  courseId: {
    _id: string;
    name: string;
    description: string;
    subjects: string[]; // Adjust if `subjects` has more complex structure
  };
  subjects: Array<{
    subjectId: string;
    topics: Array<{
      topicId: string;
      lessons: Array<{
        lessonId: string;
        isCompleted: boolean;
        completedAt: string | null;
      }>;
    }>;
  }>;
  _id: string;
}

// Infer the type of the schema
export type TCourseForm = z.infer<typeof createCourseSchema>;
