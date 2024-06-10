"use client";
import { DataTable } from "@/components/data-table";
import { columns_time_table } from "./columns-time-table";
import { tutorApiRequests } from "@/apiRequests/tutor";
import { Schedule } from "@/constants/data";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@nextui-org/react";
import { BeatLoader } from "react-spinners";

export async function TimeTable() {
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-all-schedule"],
    queryFn: () => tutorApiRequests.GetAllSchedule(),
  });
  console.log(data);
  if (isLoading) {
    return (
      <div>
        <BeatLoader />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <BeatLoader />
      </div>
    );
  }
  const schedules = data?.payload.data?.schedules;
  return (
    <div className="w-full h-full flex flex-col pt-8">
      {<DataTable data={schedules} columns={columns_time_table} />}
    </div>
  );
}
