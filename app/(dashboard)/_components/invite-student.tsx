"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import InviteStudentDetail from "./student-invite-detail";
interface InviteStudentProps {
  imageUrl?: any[];
}
export function InviteStudent({ imageUrl }: InviteStudentProps) {
  return (
    <div className="relative flex w-full max-sm:hidden">
      {imageUrl &&
        imageUrl.map((image, index) => (
          <Image
            key={index + 1}
            src={image.imageUrl}
            alt="attendees"
            width={40}
            height={40}
            className={cn("rounded-full", { absolute: index + 1 > 0 })}
            style={{ top: 0, left: (index + 1) * 28 }}
          />
        ))}
      {/* <Image
        key="1"
        src="/images/profile.jpeg"
        alt="attendees"
        width={40}
        height={40}
        className={cn("rounded-full", { absolute: 1 > 0 })}
        style={{ top: 0, left: 1 * 28 }}
      />
      <Image
        key="1"
        src="/images/profile.jpeg"
        alt="attendees"
        width={40}
        height={40}
        className={cn("rounded-full", { absolute: 2 > 0 })}
        style={{ top: 0, left: 2 * 28 }}
      />
    

      {/* <div
        className="flex-center absolute left-[120px] size-10 rounded-full border-[5px] border-dark-2 bg-dark-3
       "
      >
        +5
      </div> */}
      {/* <InviteStudentDetail /> */}
    </div>
  );
}
