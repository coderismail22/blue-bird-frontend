// src/hooks/useCourseData.ts
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Course, Lesson, Subject, Topic } from "@/types/course.type"; // Import types

const useCourseData = (studentId: string, courseId: string) => {
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch course data
  const fetchCourseData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/students/${studentId}/courses/${courseId}`
      );
      const fetchedData = response.data.data;

      // Process data to get lessons
      const allLessons: Lesson[] = fetchedData.subjects
        .flatMap((subject: Subject) => subject.topics)
        .flatMap((topic: Topic) => topic.lessons);

      setCourseData(fetchedData.courseId);
      setLessons(allLessons);
      setError(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to fetch course data.");
    } finally {
      setLoading(false);
    }
  }, [studentId, courseId]);

  // Initial fetch on mount
  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  return { courseData, lessons, loading, error, refetch: fetchCourseData };
};

export default useCourseData;
