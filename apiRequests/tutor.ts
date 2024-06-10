import AddStudent from "@/app/(dashboard)/student/_components/add-student";
import { Schedule } from "@/constants/data";
import http from "@/lib/http";

export const tutorApiRequests = {
  CreateStudent: (body: any) => {
    return http.post("/api/tutor/create-student", body);
  },
  SearchStudent: (body: any) => {
    return http.get(`/api/tutor/search-student/${body}`, body);
  },
  AddStudent: (body: any) => {
    return http.post("/api/tutor/add-student", body);
  },

  GetAllStudents: () => {
    return http.get("/api/tutor/get-all-student");
  },
  GetAllClassByTutor: () => {
    return http.get("/api/tutor/get-all-class-by-tutor");
  },
  GetCourseAndChapterNotCompleteByClass: (id: number) => {
    return http.get(`/api/room/get-all-chapter-not-complete-by-class/${id}`);
  },
  CreateSchedule: (body: any) => {
    return http.post("/api/tutor/create-schedule", body);
  },
  GetAllSchedule: () => {
    return http.get("/api/tutor/get-all-schedule");
  },
  GetScheduleById: (id: number) => {
    return http.get(`/api/tutor/get-schedule-detail/${id}`);
  },
  UpdateStatusSchedule: async (body: any) => {
    return http.post<Schedule>(`/api/tutor/update-status-schedule`, body);
  },
  GetAttendanceByClassAndDate: (body: any) => {
    return http.post(`/api/tutor/get-all-schedule-class`, body);
  },
  MarkAttendance: (body: any) => {
    return http.post(`/api/tutor/mark-present-student-schedule`, body);
  },
  GetProfileTutor: () => {
    return http.get("/api/tutor/get-profile-tutor");
  },
};
