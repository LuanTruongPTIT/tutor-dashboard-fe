"use client";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { InviteStudent } from "./invite-student";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Checkbox,
//   Input,
//   Link,
// } from "@nextui-org/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { DatePicker } from "@nextui-org/date-picker";
import {
  parseDateTime,
  parseZonedDateTime,
  Time,
} from "@internationalized/date";
import { TimeInput } from "@nextui-org/date-input";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { tutorApiRequests } from "@/apiRequests/tutor";
interface DetailScheduleProps {
  // children: React.ReactNode;
  // initialValues:
  id: number;
}
const dateStr = "2024-05-23T07:45:00.000Z";
const date = moment(dateStr);

const formattedDate = date.format("YYYY-MM-DDTHH:mm");
export const ScheduleDetail = z.object({
  topic: z.string(),
  description: z.string(),
  course: z.string(),
  chapter: z.string(),
  start_date_time: z.string(),
  end_date: z.string(),
  room: z.string(),
});
export type TypeScheduleDetail = z.infer<typeof ScheduleDetail>;
export function DetailSchedule({ id }: DetailScheduleProps) {
  const [detail, setDetail] = useState<any>();

  const form = useForm<TypeScheduleDetail>({
    resolver: zodResolver(ScheduleDetail),
  });

  async function onSubmit(id: number) {
    const res = await tutorApiRequests.GetScheduleById(id);
    console.log(res.payload.data.schedule);
    setDetail(res.payload.data.schedule);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            onSubmit(id);
          }}
        >
          Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail</DialogTitle>
        </DialogHeader>

        {detail && (
          <div className="grid gap-4 py-7">
            <div className="grid grid-row-4 sab;8ud,hklhhbliccf8ew4rh;/....mscraxvho'./tems-center gap-4">
              <Label htmlFor="Topic" className="text-left">
                Topic
              </Label>
              <Input
                id="Topic"
                className="col-span-3"
                value={detail?.topic ?? ""}
                disabled={false}
              />
            </div>

            <div className="grid grid-row-4 items-center gap-4 py-1">
              <Label htmlFor="Course" className="text-left">
                Courses
              </Label>
              <Input value={detail?.Class.course.title ?? ""} />
            </div>
            <div className="grid grid-row-4 items-center gap-4 py-1">
              <Label htmlFor="Course" className="text-left">
                Class
              </Label>
              <Input value={detail?.Class.name ?? ""} />
            </div>
            <div className="grid grid-row-4 items-center gap-4 py-1">
              <Label htmlFor="Chapter" className="text-left">
                Lesson
              </Label>
              <Input
                value={
                  detail?.Class.lesson
                    ? `Chapter ${detail?.Class.lesson[0].chapter.position}. ${detail?.Class.lesson[0].chapter.title} `
                    : ""
                }
              />
            </div>
            <div className="grid grid-row-4 items-center gap-4 py-1">
              <Label htmlFor="Formal" className="text-left">
                Formal
              </Label>
              <Input value="Online" />
            </div>
            <div className="grid grid-row-4 items-center gap-4 py-1">
              <div className="flex flex-row items-center gap-x-3">
                <DatePicker
                  className="max-w-xs"
                  label="Start date"
                  defaultValue={
                    detail?.start_date &&
                    parseDateTime(
                      moment(detail?.start_date).format("YYYY-MM-DDTHH:mm")
                    )
                  }
                  labelPlacement="outside"
                  isOpen={false}
                />
              </div>
              <DatePicker
                label="End date"
                className="max-w-xs"
                defaultValue={
                  detail?.start_date &&
                  parseDateTime(
                    moment(detail?.duration_time).format("YYYY-MM-DDTHH:mm")
                  )
                }
                labelPlacement="outside"
                isOpen={false}
              />
            </div>
            <div className="grid grid-row-4 items-center gap-4 py-2">
              <Label htmlFor="Courses" className="text-left">
                Students
              </Label>
              <InviteStudent imageUrl={detail.Class.student} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
