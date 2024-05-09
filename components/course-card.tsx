import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "./icon-badge";
import { CourseProgress } from "@/app/_component/course-progress";
import { formatPrice } from "@/lib/format";

interface CourseCardProps {
  // id: string;
  // title: string;
  // imageUrl: string;
  chaptersLength: number;
  // price: number;
  progress: number | null;
  // category: string;
}

export const CourseCard = ({
  // id = "1",
  // title = "Math",
  // imageUrl = "https://tse3.mm.bing.net/th?id=OIP.aKKIxSz6ansg1hyZMHUSKAHaDz&pid=Api&P=0&h=180",
  chaptersLength = 18,
  // price = 15.58,
  progress = 50,
}: // category = "Math",
CourseCardProps) => {
  return (
    <Link href={`/courses/course-detail/${1}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt=" Math"
            src="https://img-c.udemycdn.com/course/480x270/4174580_dd1c.jpg"
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            Math
          </div>
          <p className="text-xs text-muted-foreground">{"Math"}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress !== null ? (
            <CourseProgress
              // variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={50}
            />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(15.58)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
