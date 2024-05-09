import { CoursesList } from "@/app/_component/courses-list";

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
      <CoursesList />
    </div>
  );
}
