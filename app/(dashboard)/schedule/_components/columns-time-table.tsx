"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

// import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions";

import { labels, Schedule, statuses, Task } from "@/constants/data";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DetailSchedule } from "../../_components/edit-schedule";
import { cn } from "@/lib/utils";
// export const scheduleSchema = z.object({
//   id: z.string(),
//   topic: z.string(),
//   description: z.string(),
//   formal: z.string(),
//   date: z.string(),
//   course: z.string().optional(),
//   chapter: z.string().optional(),
//   startTime: z.string(),
//   endTime: z.string(),
//   location: z.string().optional(),
//   participants: z.array(z.string()).optional(),
// });
export const columns_time_table: ColumnDef<Schedule>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id" />
    ),
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "topic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[100px] truncate font-medium">
          {row.getValue("topic")}
        </span>
      );
    },
  },
  {
    accessorKey: "course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[100px] truncate font-medium">
          {row.getValue("course")}
        </span>
      );
    },
  },

  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[100px] truncate font-medium">
          {row.getValue("date")}
        </span>
      );
    },
  },

  {
    accessorKey: "formal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Formal" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[100px] truncate font-medium">
          {row.getValue("formal")}
        </span>
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
        <Badge
          className={cn(
            " text-center",
            row.getValue("status") === "in progress" ? "w-[90px]" : ""
          )}
          variant="default"
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    id: "detail",
    cell: ({ row }) => <DetailSchedule />,
  },
];
