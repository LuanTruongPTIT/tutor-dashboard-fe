"use client";
import { StudentSchemaType } from "@/constants/data";
import { BeatLoader } from "react-spinners";
import { columns } from "@/components/columns";
import { Heading } from "@/app/_component/heading";
import { Separator } from "@/components/ui/separator";
import BreadCrumb from "@/components/ui/breadcrumb";
import AddStudent from "./_components/add-student";
import { useQuery } from "@tanstack/react-query";
import { tutorApiRequests } from "@/apiRequests/tutor";
import { DataTable } from "./_components/data-table-student";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// };

const breadcrumbItems = [{ title: "Student", link: "/student" }];
export default function Page() {
  const [result, setResult] = useState<StudentSchemaType[]>([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: () => tutorApiRequests.GetAllStudents(),
  });
  useEffect(() => {
    if (data) {
      setResult(data.payload.data?.students);
    }
  }, [data]);
  const students = data?.payload.data?.students;

  if (error) {
    return (
      <div>
        <BeatLoader />
      </div>
    );
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Student (${(students && students.length) || 0})`}
            description="Manage student"
          />

          <AddStudent />
        </div>
        <Separator />

        {isLoading ? (
          <div>
            <BeatLoader />
          </div>
        ) : (
          <>
            {students.length !== 0 ? (
              <DataTable columns={columns} data={students} />
            ) : (
              <div>No students found</div>
            )}
          </>
        )}
      </div>
    </>
  );
}
