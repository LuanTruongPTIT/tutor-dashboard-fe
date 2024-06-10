"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Checkbox,
  Chip,
  Select,
  SelectItem,
  Snippet,
  Spinner,
  Switch,
} from "@nextui-org/react";
import { CalendarIcon, CheckIcon, Plus, TriangleAlert } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { tutorApiRequests } from "@/apiRequests/tutor";
import toast from "react-hot-toast";
import { Course } from "@/constants/data";
import { courseApiRequests } from "@/apiRequests/course";
import validator from "validator";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format, set } from "date-fns";
import { DateRange } from "react-day-picker";
import { TimeInput } from "@nextui-org/date-input";
import { TimePicker } from "antd";
import { Banner } from "@/components/banner";
type student = {
  imageUrl: string;
  fullName: string;
  email: string;
};
export const Class = [
  {
    name: "python-1",
  },
  {
    name: "python-2",
  },
];
const DATE_REQUIRED_ERROR = "Date is required.";
const FormSchema = z.object({
  course_name: z.string({
    required_error: "Please select a course.",
  }),
  date: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: DATE_REQUIRED_ERROR }
    )
    .refine((date) => {
      const currentDate = new Date();
      if (
        (date.from && date.from < currentDate) ||
        (date.to && date.to < currentDate)
      ) {
        return "Date must be in the future";
      }
      if (date.from && date.to && date.from > date.to) {
        return "End date must be after start date";
      }
      return !!date.from;
    }, DATE_REQUIRED_ERROR),
  class_name: z.string({ required_error: "Pleas select or create class name" }),
});
type FormSchemaType = z.infer<typeof FormSchema>;

export default function AddStudent() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: {
        from: undefined,
        to: undefined,
      },
      // TODO: remove this dummy value
    },
  });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState<student | null>();

  const [courses, setCourse] = useState<Course[]>([]);
  const [isSelected, setIsSlected] = useState(false);
  const [Class_Name, setClass] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [course_class, setCourseClass] = useState<any>("");
  const listenValueChange = async (value: boolean) => {
    setIsSlected(value);
    if (value) {
      try {
        const class_name = await tutorApiRequests.GetAllClassByTutor();
        setClass(class_name.payload.data.class);
      } catch (error: any) {
        if (error.data && error.data.status === 404) {
          setError(error.data.payload.message);
        } else {
          toast.error("Something went wrong!");
        }
      }
    } else {
      form.setValue("class_name", "");
      setCourseClass("");
    }
  };
  const handleSelectItem = async (item: number) => {
    try {
      const courseOfClass = await courseApiRequests.GetCourseOfClasses(item);
      setCourseClass(courseOfClass.payload.data.course);
      form.setValue(
        "course_name",
        courseOfClass.payload.data.course.course.title
      );
    } catch (error: any) {
      if (error.data && error.data.status === 404) {
        setError(error.data.payload.message);
      }
    }
  };

  const handleSearch = async () => {
    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setStudent(null);

    setError("");
    try {
      const result = await tutorApiRequests.SearchStudent(email);
      let course_name_list;
      try {
        course_name_list = await courseApiRequests.getAllCoursesUser();
      } catch (courseError) {
        toast.error("Failed to fetch courses!");
        setIsLoading(false);
        return;
      }

      setTimeout(() => {
        setIsLoading(false);
        setCourse(course_name_list.payload.data.course);
        if (!result.payload?.data?.student) {
          setError(result.payload.payload.message);
          return;
        }
        setStudent(result.payload.data.student);
      }, 3000);
    } catch (error: any) {
      if (error.payload.status === 404) {
        setError(error.payload.payload.message);
      } else {
        toast.error("Something went wrong!");
      }
      setIsLoading(false);
    }
  };

  async function onSubmit(data: FormSchemaType) {
    const student = {
      ...data,
      email,
      isSelect: isSelected,
    };
    console.log(student);
    setError("");
    try {
      await tutorApiRequests.AddStudent(student);
      toast.success("Student added successfully!");
    } catch (error: any) {
      console.log(error.payload);
      if (error.payload.status === 400) {
        console.log("vaoday");
        setError(error.payload.payload.message);
        console.log(error);
      }
      toast.error("Failed to add student!");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          {" "}
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[800px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          {/* <Banner label="This course is unpublished" /> */}
        </DialogHeader>
        <div className="grid gap-4 py-7">
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
          <div className="grid grid-row-4 w-[450px] items-center gap-4">
            <Label htmlFor="Topic" className="text-left">
              Please enter the student&apos;s email
            </Label>
            <div className="flex flex-row items-baseline gap-4">
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3 w-[350px]"
                autoComplete="off"
                placeholder="Enter email"
                type="email"
              />

              <Button onClick={handleSearch}>Search</Button>
            </div>
            {/* {notFound && (
              <p className="text-sm text-rose-600 text-left pl-3">
                Student is not found
              </p>
            )} */}
          </div>

          {isLoading && (
            <div className="text-center w-full">
              <Spinner className="w-full" color="success" />
            </div>
          )}
          {student && (
            <>
              <div className="bg-background rounded-lg w-[450px] h-[60px]">
                <div className="flex p-6 flex-cols w-full h-full gap-3 justify-start items-center ">
                  <Avatar>
                    <AvatarImage src={student?.imageUrl}></AvatarImage>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">
                      {student?.fullName}{" "}
                      <Badge
                        variant="outline"
                        className="w-[60px] text-green-500"
                      >
                        verify
                      </Badge>
                    </span>

                    <span className="text-sm opacity-30">{student.email}</span>
                  </div>
                </div>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <Switch
                    isSelected={isSelected}
                    color="success"
                    onValueChange={listenValueChange}
                    className="text-xs opacity-70 h-[10px]"
                  >
                    <FormLabel>Enable Select Valid Class</FormLabel>
                  </Switch>
                  {isSelected ? (
                    <FormField
                      control={form.control}
                      name="class_name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Class Name</FormLabel>
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
                                    ? Array.isArray(field.value)
                                      ? field.value.map(
                                          (class_name: any) => class_name.name
                                        )
                                      : field.value.toString()
                                    : "Select a class"}

                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search class..."
                                  className="h-9"
                                />
                                <CommandEmpty>No class found.</CommandEmpty>
                                <CommandGroup>
                                  {Class_Name &&
                                    Class_Name.map((class_name) => (
                                      <CommandItem
                                        value={class_name.name}
                                        key={class_name.id}
                                        onSelect={() => {
                                          handleSelectItem(class_name.id);
                                          form.setValue(
                                            "class_name",
                                            class_name.name
                                          );
                                        }}
                                      >
                                        {class_name.name}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            class_name.name === field.value
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name="class_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. 'Python-D19'" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  {!isSelected && (
                    <FormField
                      control={form.control}
                      name="course_name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Course</FormLabel>
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
                                    ? Array.isArray(field.value)
                                      ? field.value.map(
                                          (course: Course) => course.title
                                        )
                                      : field.value.toString()
                                    : "Select a course"}

                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Search Course..."
                                  className="h-9"
                                />
                                <CommandEmpty>No course found.</CommandEmpty>
                                <CommandGroup>
                                  {courses &&
                                    courses.map((course) => (
                                      <CommandItem
                                        value={course.title}
                                        key={course.title}
                                        onSelect={() => {
                                          form.setValue(
                                            "course_name",
                                            course.title
                                          );
                                        }}
                                      >
                                        {course.title}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            course.title === field.value
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
                            This is the course that will be add for student .
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {isSelected && (
                    <FormField
                      control={form.control}
                      name="course_name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Course</FormLabel>
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
                                  {course_class
                                    ? course_class.course.title
                                    : ""}

                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                          </Popover>
                          <FormDescription>
                            This is the course that will be add for student .
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Course - End Course</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value?.from && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                    {format(field.value.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(field.value.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              // disabled={true}
                              initialFocus
                              mode="range"
                              // defaultMonth={field.value.from}
                              selected={{
                                from: field.value.from!,
                                to: field.value.to,
                              }}
                              onSelect={field.onChange}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          The date to start and end the course.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
