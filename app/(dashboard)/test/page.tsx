import { cn } from "@/lib/utils";
import Task from "../_components/task";
import { DialogDemo } from "../_components/create-schedule";
import { SelectStudent } from "@/app/_component/select-student";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-[10px] justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}
export default function page() {
  // const handleDelete = (index) => {
  //   const newCourses = [...courses];
  //   newCourses.splice(index, 1);
  //   setCourses(newCourses);
  // };
  return (
    <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid xl:grid-cols-3">
      <div className="flex flex-row gap-[10px] items-start justify-between">
        <DialogDemo />
        <SelectStudent />
        <Tabs defaultValue="overview" className="space-y-4">
          {/* <h2>Sort by:</h2> */}
          <TabsList>
            <TabsTrigger value="overview">Compelete</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Pendingx
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Absent
            </TabsTrigger>
            {/* <TabsTrigger value="notifications" disabled>
              Subjects
            </TabsTrigger> */}
          </TabsList>
        </Tabs>
      </div>

      <div className="col-span-3  grid items-start gap-6 ">
        <DemoContainer className="grid grid-cols-3 gap-4">
          <Task />
          {/* <Task />
          <Task />
          <Task />
          <Task />
          <Task /> */}
        </DemoContainer>
      </div>
    </div>
  );
}
