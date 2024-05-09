import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DialogDemo } from "../../_components/create-schedule";
import Image from "next/image";

export function CreateSchedule() {
  return (
    <Card className="w-[50%] h-[100px] flex justify-center items-center">
      <CardContent className="flex flex-row pt-[20px] flex-grow h-full justify-around gap-10 items-center mx-auto">
        <div className="flex flex-row gap-x-5">
          <div className="flex justify-center items-center glassmorphism size-12 rounded-[10px]">
            <Image
              src="/icons/schedule.svg"
              alt="meeting"
              className=""
              width={27}
              height={27}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="text-sm text-gray-700">Create Schedule</span>
            <p className="text-base">Create schedule and notify student</p>
          </div>
        </div>
        <div>
          <DialogDemo />
        </div>
      </CardContent>
    </Card>
  );
}
