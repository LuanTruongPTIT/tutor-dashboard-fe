import http from "@/lib/http";
import { z } from "zod";
import { Course } from "@/constants/data";
export const CreateCourseBodyType = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." }),
});
export type data = {
  status: number;
  payload: any;
};
export const CourseType = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
  chapters: z.array(z.object({ title: z.string() })),
  price: z.number(),
});

export type CreateCourseBodyType = z.infer<typeof CreateCourseBodyType>;
export const courseApiRequests = {
  createCourse: (body: CreateCourseBodyType) => {
    return http.post("/api/course/create-course", body);
  },
  // getCourses: (id: number) => {
  //   return http.get<data>(`/api/course/get-course/${id}`);
  // },
  getCourses: (id: number) => {
    return http.get<Course>(`/api/course/get-course/${id}`);
  },
  courseUpdate: (id: number, body: any) => {
    return http.put(`/api/course/update-course/${id}`, body);
  },
  createChapter: (id: number, body: any) => {
    return http.post(`/api/course/${id}/create-chapter`, body);
  },
  updateChapterReorder: (id: number, body: any) => {
    return http.put(`/api/course/${id}/chapters/reorder`, body);
  },
  getAllCoursesUser: () => {
    return http.get<Course[]>("/api/course/get-all-courses");
  },
};
