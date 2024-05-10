import http from "@/lib/http";
import { z } from "zod";

export const CreateCourseBodyType = z.object({
  name: z.string(),
});
export type CreateCourseBodyType = z.infer<typeof CreateCourseBodyType>;
export const courseApiRequests = {
  createCourse: (body: CreateCourseBodyType) =>
    http.post("/api/course/create-course", body),
};
