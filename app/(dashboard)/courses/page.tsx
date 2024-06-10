import { CoursesList } from "@/app/_component/courses-list";
import Loading from "@/app/loading";
import Breadcrumb from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import { Toaster } from "sonner";
const breadcrumbItems = [{ title: "Course", link: "/courses" }];
export default function Courses() {
  return (
    <div className="p-6 space-y-4">
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
         icon={Clock}
         label="In Progress"
         numberOfItems={coursesInProgress.length}
       />
       <InfoCard
         icon={CheckCircle}
         label="Completed"
         numberOfItems={completedCourses.length}
         variant="success"
       />
     </div> */}
      <div className="flex flex-row justify-between items-baseline">
        <Breadcrumb items={breadcrumbItems} />
        <Link href="/courses/create">
          {" "}
          <Button>+ Add Course</Button>
        </Link>
      </div>

      <Suspense fallback={<Loading />}>
        <CoursesList />
      </Suspense>
    </div>
  );
}
