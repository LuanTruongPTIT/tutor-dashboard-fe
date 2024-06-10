"use client";
import { Combobox } from "@/components/combobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactDatePicker from "react-datepicker";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { any, z } from "zod";
import { Control, Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker, TimePicker } from "antd";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "antd/lib/date-picker/style";
import dayjs, { Dayjs } from "dayjs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import React from "react";

import {
  Popover as Popoverui,
  PopoverTrigger as PopoverTriggerui,
  PopoverContent as PopoverContentui,
  Button as Buttonui,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";

import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar as Avatarui,
} from "@nextui-org/react";
import { ZonedDateTime } from "@internationalized/date";
import { duration } from "@mui/material";

const initialValues = {
  dateTime: new Date(),
  // description: "",
  // link: "",
};
const dayjsZodSchema = z.custom<dayjs.Dayjs[]>(
  (value) => Array.isArray(value) && value.every(dayjs.isDayjs),
  { message: "Expected an array of Dayjs objects" }
);
export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    email: "zoey.lang@example.com",
  },
];
const stringSetSchema = z.custom<Selection>(
  (value) =>
    value instanceof Set &&
    Array.from(value).every((item) => typeof item === "string"),
  { message: "Please select student" }
);

const subjects = [
  {
    value: "math",
    label: "Math",
  },
  {
    value: "react",
    label: "React",
  },
];

export function CreateTimeTable() {
  const form = useForm<TypeCreateSchedule>({
    resolver: zodResolver(CreateSchedule),
    defaultValues: {
      topic: "",
      description: "",
      course: "",
    },
  });

  // const [open, setOpen] = useState(false);
  // const [valueSubject, setValueSubject] = useState("");
  // const [values, setValues] = useState(initialValues);
  function processForm(data: TypeCreateSchedule) {
    console.log(data);
    data.startAndEndTime.map((item) => {
      console.log(item.format("HH:mm:ss"));
    });
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Create Schedule</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Schedule</SheetTitle>
          <SheetDescription>
            Create schedule for your students. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)}>
            <div className="grid gap-4 py-5">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input {...field} id="topic" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Description</FormLabel>
                    <div className="grid grid-row-4 items-center gap-4">
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write description here....."
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="courses"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Courses</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? subjects.find(
                                  (subject) => subject.value === field.value
                                )?.label
                              : "Select language"}
                            {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {subjects.map((subject) => (
                              <CommandItem
                                value={subject.label}
                                key={subject.value}
                                onSelect={() => {
                                  form.setValue("courses", subject.value);
                                }}
                              >
                                {subject.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    subject.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This is the language that will be used in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startAndEndTime"
                render={({ field }) => (
                  <div className="grid grid-row-4 items-center gap-4 py-1">
                    <FormLabel>End Time</FormLabel>
                    <FormItem>
                      <FormControl>
                        <TimePicker.RangePicker
                          onChange={(vals) =>
                            vals
                              ? form.setValue("startAndEndTime", [
                                  dayjs(vals[0], "HH:mm:ss"),
                                  dayjs(vals[1], "HH:mm:ss"),
                                ])
                              : form.setValue("startAndEndTime", [])
                          }
                          value={
                            field.value
                              ? [field.value[0], field.value[1]]
                              : undefined
                          }
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  </div>
                )}
              />
            </div>

            <Button>Save changes</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
