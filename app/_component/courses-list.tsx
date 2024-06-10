"use client";
import { courseApiRequests } from "@/apiRequests/course";
import { CourseCard } from "@/components/course-card";
import { useQuery } from "@tanstack/react-query";

// import { CourseCard } from "@/components/course-card";

// type CourseWithProgressWithCategory = Course & {
//   category: Category | null;
//   chapters: { id: string }[];
//   progress: number | null;
// };

// interface CoursesListProps {
//   items: CourseWithProgressWithCategory[];
// }

export const CoursesList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-courses"],
    queryFn: courseApiRequests.getAllCoursesUser,
  });
  const items = data?.payload.data?.course || [];
  console.log("items", items);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item: any) => (
          <CourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            chaptersLength={item.chaptersLength}
            price={item.price!}

            // category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 ||
        (error && (
          <div className="text-center text-sm text-muted-foreground mt-10">
            No courses found
          </div>
        ))}
    </div>
  );
};
