"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// import { DataTableRowActions } from "./data-table-row-actions";
import {
  ActivityLogIcon,
  Cross2Icon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import {
  labels,
  StudentCourseProgressType,
  StudentSchemaType,
  Task,
} from "@/constants/data";

import EditStudents from "@/app/(dashboard)/student/_components/student-detail";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "antd";
import { CourseProgress } from "@/app/_component/course-progress";
// import { Progress } from "@nextui-org/react";

export const columns_courses_progress: ColumnDef<StudentCourseProgressType>[] =
  [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "imageUrl",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Student" />
      ),
      cell: ({ row }) => {
        return (
          <>
            <div className="flex flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage src={row.original.imageUrl} alt="@shadcn" />
              </Avatar>
              <span>{row.original.student}</span>
            </div>
          </>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "course",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Course" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[200px] truncate font-normal">
              {row.getValue("course")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "progress",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Progress" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex flex-col justify-center space-x-2">
            <CourseProgress
              variant={60 === 100 ? "success" : "default"}
              size="sm"
              value={50}
            />
            <span className="max-w-[100px] truncate font-normal text-sm text-gray-500">
              {`Chapters: ${row.original.completed_chapter}/${row.original.total_chapter}`}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "start_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Start Course" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[100px] truncate font-medium">
              {row.getValue("start_date")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "end_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="End Course" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[100px] truncate font-medium">
              {row.getValue("end_date")}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[100px] truncate font-medium">
              {row.getValue("status")}
            </span>
          </div>
        );
      },
    },
  ];
