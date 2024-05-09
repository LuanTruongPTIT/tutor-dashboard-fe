"use client";
import { DataTable } from "@/components/data-table";
import { columns_time_table } from "./columns-time-table";

const scheduleData = [
  {
    id: "1",
    topic: "Introduction to JavaScript",
    description: "Basic concepts and syntax of JavaScript programming language",
    formal: "Online class",
    date: "2024-05-10",
    course: "Web Development Fundamentals",
    chapter: "Chapter 1",
    startTime: "09:00 AM",
    endTime: "11:00 AM",
    status: "done",
  },
  {
    id: "2",
    topic: "Conditional Statements",
    description: "Understanding if, else, and switch statements in JavaScript",
    formal: "Online class",
    date: "2024-05-12",
    course: "Web Development Fundamentals",
    chapter: "Chapter 2",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    status: "in progress",
  },
  {
    id: "3",
    topic: "Arrays and Loops",
    description:
      "Working with arrays and different types of loops in JavaScript",
    formal: "Online class",
    date: "2024-05-15",
    course: "Web Development Fundamentals",
    chapter: "Chapter 3",
    startTime: "09:30 AM",
    endTime: "11:30 AM",
    status: "done",
  },
];

export default scheduleData;

export function TimeTable() {
  return (
    <div className="w-full h-full flex flex-col pt-8">
      <DataTable data={scheduleData} columns={columns_time_table} />
    </div>
  );
}
