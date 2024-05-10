// "use client";
import Breadcrumb from "@/components/ui/breadcrumb";
import { CreateSchedule } from "./_components/create-schedule";
import { TimeTable } from "./_components/time-table";
import { Suspense } from "react";
import Loading from "@/app/loading";
const breadcrumbItems = [{ title: "Schedule", link: "/schedule" }];
export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col mt-[50px] gap-5">
          <Breadcrumb items={breadcrumbItems} />
          <CreateSchedule />
          <TimeTable />
        </div>
      </div>
    </Suspense>
  );
}
