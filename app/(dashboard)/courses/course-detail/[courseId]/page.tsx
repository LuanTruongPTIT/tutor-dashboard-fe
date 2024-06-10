"use client";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { PriceForm } from "@/app/_component/price-form";
import { Actions } from "@/app/_component/action";
import { TitleForm } from "@/app/_component/title-form";
import { DescriptionForm } from "@/app/_component/description-form";
import { ImageForm } from "@/app/_component/image-form";
import { ChaptersForm } from "@/app/_component/chapters-form";
import { AttachmentForm } from "@/app/_component/attached-form";
import { CategoryForm } from "@/app/_component/category-form";
import { Course } from "@/constants/data";
import { useQuery } from "@tanstack/react-query";
import { courseApiRequests } from "@/apiRequests/course";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
export type data = {
  dstatus: number;
  payload: any;
};
// eslint-disable-next-line @next/next/no-async-client-component
const courses_init = {
  id: "",

  title: "",
  description: "",
  imageUrl: "",
  category: null,
  chapters: [],
  price: 0,
  userId: "",
  isPublished: false,
  createdAt: "",
  updatedAt: "",
  chapter: [],
  attachments: [],
  purchases: [],
};
//  id: string;
//   userId: string;
//   title: string;
//   description?: string | null;
//   imageUrl?: string | null;
//   price?: number | null;
//   isPublished: boolean;
//   categoryId?: string | null;
//   category?: Category | null;
//   chapters: Chapter[];
//   attachments: Attachment[];
//   purchases: Purchase[];
//   createdAt: Date;
//   updatedAt: Date;
// };
// eslint-disable-next-line @next/next/no-async-client-component
const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const courses_init = {
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    category: null,
    chapters: [],
    price: 0,
    userId: "",
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),

    attachments: [],
    purchases: [],
  };
  const [course, setCourse] = useState<Course>(courses_init);
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["courses", params.courseId],
    queryFn: () => {
      return courseApiRequests.getCourses(Number(params.courseId));
    },
    retry: 0,
  });

  useEffect(() => {
    if (data) {
      setCourse(data.payload.data.course);
    }
    if (error) {
      router.push("/courses/create");
    }
  }, [data, error, router]);
  //
  const categories = [{ name: "python", id: "python" }];
  return (
    <>
      {course && !course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )}
      <div className="overflow-y-auto h-full p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course setup</h1>
            <span className="text-sm">
              {/* Complete all fields {completionText} */}
              Complete all fields (6/6)
            </span>
          </div>
          <Actions
            disabled={false}
            courseId={params.courseId}
            // isPublished={course.isPublished}
            isPublished={true}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm initialData={course} courseId={params.courseId} />

            <DescriptionForm initialData={course} courseId={params.courseId} />
            <ImageForm initialData={course} courseId={params.courseId} />
            <CategoryForm
              initialData={course}
              courseId={params.courseId}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChaptersForm initialData={course} courseId={params.courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={params.courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              {/* <AttachmentForm initialData={course} courseId={params.courseId} /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseIdPage;
