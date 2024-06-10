"use client";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";
import {
  StudentCourseProgressType,
  StudentSchemaType,
  taskSchema,
} from "@/constants/data";
import { BeatLoader } from "react-spinners";
import { columns } from "@/components/columns";
import { Heading } from "@/app/_component/heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import BreadCrumb from "@/components/ui/breadcrumb";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { tutorApiRequests } from "@/apiRequests/tutor";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/data-table";
import { columns_courses_progress } from "./_components/columns-progres-course";
import Chart from "./_components/chart";

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// };
const studentProgress: StudentCourseProgressType[] = [
  {
    imageUrl:
      "https://utfs.io/f/e37596dd-0d97-4a1e-80d4-1eeb51341826-5482fr.jpeg",
    student: "Luân Trương",
    progress: "50%",
    start_date: "2021-10-10",
    end_date: "2021-10-10",
    course: "Mathematics",
    status: "In Progress",
    total_chapter: 10,
    completed_chapter: 5,
  },
];
const breadcrumbItems = [{ title: "Course", link: "/courses" }];
export default function Page() {
  return (
    <>
      <div className="hidden h-full flex-1 flex-col p-8 md:flex">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between pb-8">
          <Heading
            title={`Course Progress`}
            description="Acess course progress of students"
          />
        </div>
        <Separator className="mb-8" />

        {/* {isLoading ? (
          <div>
            <BeatLoader />
          </div>
        ) : (
          <DataTable columns={columns} data={students} />
        )} */}
        <div className="grid lg:grid-cols-7 gap-4">
          <div className="rounded-xl bg-card col-span-5">
            <DataTable
              columns={columns_courses_progress}
              data={studentProgress}
            />
          </div>
          <div className="rounded-xl border bg-card col-span-2">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                Progress Statistics
              </h3>
            </div>
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
}
