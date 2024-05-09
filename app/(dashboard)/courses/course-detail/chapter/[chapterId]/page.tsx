import { IconBadge } from "@/components/icon-badge";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import Link from "next/link";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { VideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-action";
import { Banner } from "@/components/banner";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  // const requiredFields = [
  //   chapter.title,
  //   chapter.description,sdsrzzfkd
  //   chapter.videoUrl,
  // ]
  const isPublished = false;
  return (
    <>
      {!isPublished && (
        <Banner
          label="This chapter is unpublished. It will not be visbile in the course "
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/courses/course-detail/${params.courseId}`}
              className="flex it\ems-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center w-full justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-slate-700">
                  Compelete all fields{" "}
                </span>
              </div>
              <ChapterActions
                disabled={false}
                isPublished={false}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={{ title: "Chapter 1" }}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={{ description: "This is a description" }}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex item-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl py-2">Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={{
                  description: "This is a description",
                  isFree: true,
                }}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">Add video</h2>
            </div>
            <VideoForm
              initialData={{ videoUrl: "" }}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ChapterIdPage;
