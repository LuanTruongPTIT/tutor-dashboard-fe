"use client";
import { cn } from "@/lib/utils";
import ProfilePhoto from "./_components/Profile-Photo";
import AboutMe from "./_components/About-Me";
import ContactInfo from "./_components/Contact-Info";
import Education from "./_components/Education";
import { useQuery } from "@tanstack/react-query";
import { tutorApiRequests } from "@/apiRequests/tutor";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
export type ProfileType = {
  imagePhoto: string;
  fullName: string;
  email: string;
  address: string;
  phone_number: string;
  bio: string;
  activities: Record<string, any>[];
};
function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}
export default function Profile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile-tutor"],
    queryFn: async () => {
      return await tutorApiRequests.GetProfileTutor();
    },
  });
  if (error) {
    toast.error("Something went wrong");
  }
  const result = data?.payload.data.profile as ProfileType;
  console.log(result, data?.payload);
  if (isLoading) {
    return (
      <div className="items-start justify-center gap-10 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 h-screen overflow-y-auto">
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <Skeleton className="flex items-center justify-center [&>div]:w-full" />
        </div>
      </div>
    );
  }
  return (
    <div className="items-start justify-center gap-10 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 h-screen overflow-y-auto">
      <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
        <DemoContainer>
          <ProfilePhoto data={result} />
        </DemoContainer>
        <DemoContainer>
          <AboutMe data={result} />
        </DemoContainer>
        <DemoContainer>
          <ContactInfo data={result} />
        </DemoContainer>
      </div>
      <div className="col-span-3 grid items-start gap-6 lg:col-span-2 h-screen">
        <DemoContainer>
          <Education data={result} />
        </DemoContainer>
      </div>
    </div>
  );
}
