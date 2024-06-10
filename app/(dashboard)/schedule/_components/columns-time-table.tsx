"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { labels, Schedule, statuses, Task } from "@/constants/data";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DetailSchedule } from "../../_components/edit-schedule";
import { cn } from "@/lib/utils";
import { CrossCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { DataTableRowActionSchedule } from "../../student/_components/data-table-row-action-schedule";
export const statuses_schedule = [
  {
    value: "In Progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },

  {
    value: "Pending",
    label: "Pending",
    icon: CrossCircledIcon,
  },
  {
    value: "Canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
  {
    value: "Completed",
    label: "Completed",
    icon: CrossCircledIcon,
  },
];
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
    accessorKey: "room",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Class" />
    ),
    cell: ({ row }) => {
      return (
        <span className="max-w-[100px] truncate font-medium">
          {row.getValue("room")}
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
    cell: ({ row }) => (
      // console.log(row.original.id);
      <DetailSchedule id={row.original.id} />
    ),
  },
  {
    id: "action",
    cell: ({ row }) => (
      <DataTableRowActionSchedule row={row} status={statuses_schedule} />
    ),
  },
];
