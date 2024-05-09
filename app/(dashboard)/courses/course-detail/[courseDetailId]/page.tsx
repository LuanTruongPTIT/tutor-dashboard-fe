import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

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

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course: Course = {
    id: "1",
    userId: "user1",
    title: "Math Course",
    description: "This is a math course",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/4174580_dd1c.jpg",
    price: 100.0,
    isPublished: true,
    categoryId: "category1",
    createdAt: new Date(),
    updatedAt: new Date(),
    chapters: [
      {
        id: "1",
        title: "Chapter 1",
        description: "This is chapter 1",
        videoUrl: "http://example.com/video1.mp4",
        position: 1,
        isPublished: true,
        isFree: true,
        // muxData: {
        //   id: "1",
        //   assetId: "asset1",
        //   playbackId: "playback1",
        //   chapterId: "1",
        //   chapter: null
        // },
        courseId: "course1",
        // course: null,
        userProgress: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Chapter 2",
        description: "This is chapter 2",
        videoUrl: "http://example.com/video1.mp4",
        position: 2,
        isPublished: true,
        isFree: true,
        // muxData: {
        //   id: "1",
        //   assetId: "asset1",
        //   playbackId: "playback1",
        //   chapterId: "1",
        //   chapter: null
        // },
        courseId: "course1",
        // course: null,
        userProgress: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        title: "Chapter 3",
        description: "This is chapter 3",
        videoUrl: "http://example.com/video1.mp4",
        position: 3,
        isPublished: true,
        isFree: true,
        // muxData: {
        //   id: "1",
        //   assetId: "asset1",
        //   playbackId: "playback1",
        //   chapterId: "1",
        //   chapter: null
        // },
        courseId: "course1",
        // course: null,
        userProgress: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    attachments: [],
    purchases: [],
  };
  const categories = [{ name: "python", id: "python" }];
  return (
    <>
      {/* {!course.isPublished && (
        <Banner label="This course is unpublished. It will not be visible to the students." />
      )} */}

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

            <TitleForm initialData={{ title: "python" }} courseId={"10"} />
            <DescriptionForm initialData={course} courseId={"10"} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
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
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseIdPage;
