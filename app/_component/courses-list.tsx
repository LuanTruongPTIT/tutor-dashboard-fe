// type Course = {
//  id: number
// userId: number
// title: string
// description: string
// imageUrl: string
// // price Float?
// isPublished: boolean
// categoryId: number
// chapters Chapter[]
// attachments Attachment[]
// createdAt: Date
// updatedAt: Date
// };
// import { Category, Course } from "@prisma/client";

import { CourseCard } from "@/components/course-card";

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
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {/* {items.map((item) => ( */}
        <CourseCard
          // key={item.id}
          // id={item.id}
          // title={item.title}
          // imageUrl={item.imageUrl!}
          chaptersLength={18}
          // price={item.price!}
          progress={50}
          // category={item?.category?.name!}
        />
        <CourseCard
          // key={item.id}
          // id={item.id}
          // title={item.title}
          // imageUrl={item.imageUrl!}
          chaptersLength={18}
          // price={item.price!}
          progress={50}
          // category={item?.category?.name!}
        />
        <CourseCard
          // key={item.id}
          // id={item.id}
          // title={item.title}
          // imageUrl={item.imageUrl!}
          chaptersLength={18}
          // price={item.price!}
          progress={50}
          // category={item?.category?.name!}
        />
        <CourseCard
          // key={item.id}
          // id={item.id}
          // title={item.title}
          // imageUrl={item.imageUrl!}
          chaptersLength={18}
          // price={item.price!}
          progress={50}
          // category={item?.category?.name!}
        />
        <CourseCard
          // key={item.id}
          // id={item.id}
          // title={item.title}
          // imageUrl={item.imageUrl!}
          chaptersLength={18}
          // price={item.price!}
          progress={50}
          // category={item?.category?.name!}
        />
        {/* ))} */}
      </div>
      {/* {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )} */}
    </div>
  );
};
