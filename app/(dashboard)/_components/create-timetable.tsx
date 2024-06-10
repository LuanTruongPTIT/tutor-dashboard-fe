"use client";
import * as React from "react";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import { DatePicker } from "@nextui-org/date-picker";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Button as ButtonNextUi, Snippet } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { TimeInput } from "@nextui-org/date-input";
import {
  parseAbsoluteToLocal,
  Time,
  ZonedDateTime,
} from "@internationalized/date";
import { courseApiRequests } from "@/apiRequests/course";
import { tutorApiRequests } from "@/apiRequests/tutor";
import { z } from "zod";
import toast from "react-hot-toast";
export const CreateSchedule = z.object({
  topic: z.string().min(1, { message: "Please enter a topic" }),
  description: z.string(),
  room: z.string().min(1, { message: "Please select a course" }),
  course: z.number().optional(),
  chapters: z.number().optional(),

  date_schedule: z.any().refine(
    (value) => {
      if (!value) return false;

      const date = new ZonedDateTime(
        value.year,
        value.month,
        value.day,
        value.timeZone,
        value.offset,

        value.hour,
        value.minute,
        value.second,
        value.miliSecond
      );
      const iostring = date.toDate();

      const currentDate = new Date();
      console.log(iostring);
      console.log(currentDate);
      console.log(iostring > currentDate);
      return iostring > currentDate;
    },
    {
      message: "Date must be after today",
    }
  ),

  duration_time: z.any(),
  // .refine(() => false, { message: "Please enter a duration time" }),
});
export type TypeCreateSchedule = z.infer<typeof CreateSchedule>;
export async function CreateTimeTable() {
  const [course, setCourse] = React.useState<any | null>([]);
  const [chapters, setChapters] = React.useState<any[] | null>([]);
  const [hidden, setHidden] = React.useState(true);
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState<any[] | []>([]);
  const [notCreate, setNotCreate] = useState(false);
  const [error, setError] = useState("");
  const fetchCoursesAndChapterByClass = async (class_id: string) => {
    try {
      const courseAndChapter =
        await tutorApiRequests.GetCourseAndChapterNotCompleteByClass(
          Number(class_id)
        );
      return courseAndChapter;
    } catch (error: any) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const fetchClassName = async () => {
      try {
        const class_name = await tutorApiRequests.GetAllClassByTutor();

        setRoom(class_name?.payload.data.class);
      } catch (error) {
        console.log(error);
      }
    };

    if (open) {
      fetchClassName();
    }
  }, [open]);
  const setOpenCreateSchedule = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setOpen(true);
    try {
      const class_name = await tutorApiRequests.GetAllClassByTutor();
      setOpen(true);
      setRoom(class_name?.payload.data.class);
    } catch (error) {
      console.log(error);
    }
  };
  const onSelectCourse = async (value: string) => {
    setNotCreate(false);
    setChapters([]);
    setCourse("");
    const courseAndChapter = await fetchCoursesAndChapterByClass(value);
    if (courseAndChapter?.payload.data.chapters.course === null) {
      setNotCreate(true);
      return;
    }
    setCourse(courseAndChapter?.payload.data.chapters.course.title);
    form.setValue("course", courseAndChapter?.payload.data.chapters.course.id);
    if (courseAndChapter?.payload.data.chapters.chapters.length === 0) {
      setNotCreate(true);
      return;
    }
    setChapters(courseAndChapter?.payload.data.chapters.chapters);
    setHidden(false);
    console.log(courseAndChapter);
  };
  const form = useForm<TypeCreateSchedule>({
    resolver: zodResolver(CreateSchedule),
    defaultValues: {
      topic: "",
      description: "",
      room: "",
      // course: "",
      // chapters: "",
      // date_time: dayjs("2022-04-17T15:30"),
      // duration: ,
    },
  });

  async function processForm(data: TypeCreateSchedule) {
    setError("");
    const date = new ZonedDateTime(
      data.date_schedule.year,
      data.date_schedule.month,
      data.date_schedule.day,
      data.date_schedule.timeZone,
      data.date_schedule.offset,

      data.date_schedule.hour,
      data.date_schedule.minute,
      data.date_schedule.second,
      data.date_schedule.miliSecond
    );
    data.date_schedule = date.toDate();
    const durationTime = new Time(
      data.duration_time.hour,
      data.duration_time.minute
    );
    data.duration_time = durationTime.toString();
    console.log(error);
    try {
      await tutorApiRequests.CreateSchedule(data);
      toast.success("Create schedule success!");
    } catch (error: any) {
      console.log("error", error.payload, error);
      if (error.payload.status === 400) {
        console.log(error.payload);
        console.log(error.payload.payload.message);
        setError(error.payload.payload.message);
      }
    }
  }
  return (
    <React.Fragment>
      <Button onClick={setOpenCreateSchedule}>Create Schedule</Button>
      <Drawer
        size="md"
        variant="plain"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          className="bg-background"
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle className="text-foreground">Create Schedule</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(processForm)}>
              <div className="flex flex-col w-full gap-3 mb-[20px]">
                {notCreate && (
                  <Snippet
                    color="warning"
                    className="w-full"
                    hideCopyButton
                    hideSymbol
                  >
                    WARNING:You have not created a course or chapter!
                  </Snippet>
                )}
                {error && (
                  <Snippet
                    color="danger"
                    className="w-full"
                    hideCopyButton
                    hideSymbol
                  >
                    {error}
                  </Snippet>
                )}
                <div className="flex flex-row">
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-foreground">Topic</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="w-full text-foreground"
                            id="topic"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-left text-foreground">
                          Description
                        </FormLabel>
                        <div className="grid grid-row-4 items-center gap-4">
                          <FormControl>
                            <Textarea
                              {...field}
                              className="text-foreground"
                              placeholder="Write description here....."
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row w-full pt-[8px]">
                  <FormField
                    control={form.control}
                    name="room"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="text-foreground">Class</FormLabel>
                        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                          <Select
                            label="Select a class"
                            className="max-w-xs"
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                          >
                            {room
                              ? room.map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.name}
                                    onClick={() => onSelectCourse(item.id)}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))
                              : []}
                          </Select>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!hidden && (
                  <>
                    <div className="flex flex-row w-full pt-[10px]">
                      <FormField
                        control={form.control}
                        name="course"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-foreground">
                              Course
                            </FormLabel>
                            <Input
                              disabled={true}
                              value={course}
                              className="text-foreground"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {course && chapters && chapters.length !== 0 && (
                      <div className="flex flex-row w-full pt-[10px]">
                        <FormField
                          control={form.control}
                          name="chapters"
                          render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                              <FormLabel className="text-foreground">
                                Chapters
                              </FormLabel>
                              <FormControl>
                                <Select
                                  isRequired
                                  label="Select a chapter"
                                  className="max-w-xs"
                                  value={field.value}
                                  onChange={(e) =>
                                    form.setValue(
                                      "chapters",
                                      Number(e.target.value)
                                    )
                                  }
                                >
                                  {course &&
                                    chapters &&
                                    chapters.length !== 0 &&
                                    chapters.map((chapter) => (
                                      <SelectItem
                                        key={chapter.id}
                                        value={chapter.id}
                                      >
                                        {chapter.title}
                                      </SelectItem>
                                    ))}
                                </Select>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="flex items-center flex-row gap-x-2">
                  <FormField
                    control={form.control}
                    name="date_schedule"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <DatePicker
                          label="Select Time Schedule"
                          className="max-w-xs font-medium"
                          defaultValue={parseAbsoluteToLocal(
                            "2024-05-07T07:45:00Z"
                          )}
                          labelPlacement="outside"
                          onChange={field.onChange}
                          value={field.value}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="duration_time"
                    render={({ field }) => (
                      <FormItem className="pt-[19px]">
                        <FormControl>
                          <TimeInput
                            label="Duration Time"
                            placeholderValue={new Time(9)}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit">Save</Button>
            </form>
          </Form>
          <DialogContent sx={{ gap: 2 }}></DialogContent>

          <Divider sx={{ mt: "auto" }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            useFlexGap
            spacing={1}
          >
            <Button
              onClick={() => {
                form.reset();
              }}
            >
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
