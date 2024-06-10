import BreadCrumb from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateStudent } from "./_component/create-student";

const breadcrumbItems = [{ title: "Student", link: "/student" }];
export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <CreateStudent initialData={null} />
      </div>
    </ScrollArea>
  );
}
