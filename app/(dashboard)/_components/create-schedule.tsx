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
import { z } from "zod";
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
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
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
const initialValues = {
  dateTime: new Date(),
  // description: "",
  // link: "",
};
const dayjsZodSchema = z.custom<dayjs.Dayjs[]>(
  (value) => Array.isArray(value) && value.every(dayjs.isDayjs),
  { message: "Expected an array of Dayjs objects" }
);

export const CreateSchedule = z.object({
  topic: z.string().min(1, { message: "Please enter a valid value" }),
  description: z.string(),
  courses: z.string().min(1, { message: "Please select a valid value" }),
  subject: z.string(), // Fix: Provide the missing argument for z.array()
  dateTime: z.date(),
  endTime: dayjsZodSchema,
});
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
export type TypeCreateSchedule = z.infer<typeof CreateSchedule>;
export function DialogDemo() {
  const form = useForm<TypeCreateSchedule>({
    resolver: zodResolver(CreateSchedule),
    defaultValues: {
      topic: "",
      description: "",
      courses: "",
      subject: "",
      dateTime: new Date(),
      endTime: [dayjs("00:00:00", "HH:mm:ss"), dayjs("00:00:00", "HH:mm:ss")],
    },
  });

  // const [open, setOpen] = useState(false);
  // const [valueSubject, setValueSubject] = useState("");
  // const [values, setValues] = useState(initialValues);
  function processForm(data: TypeCreateSchedule) {
    data.endTime.map((item) => {
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
                  <FormItem>
                    <div className="grid grid-row-4 items-center gap-4 py-1">
                      <FormLabel>Select Date and Start Time</FormLabel>
                      <FormControl>
                        <ReactDatePicker
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          timeCaption="time"
                          dateFormat="MMMM d, yyyy h:mm aa"
                          className="w-full rounded p-2 focus:outline-none"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <div className="grid grid-row-4 items-center gap-4 py-1">
                    <FormLabel>End Time</FormLabel>
                    <FormItem>
                      <FormControl>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["TimePicker"]}>
                            <TimePicker
                              label="Basic time picker"
                              onChange={(date) => field.onChange(dayjs(date))}
                              value={field.value ? dayjs(field.value) : null}
                            />
                          </DemoContainer>
                        </LocalizationProvider> */}

                        <TimePicker.RangePicker
                          onChange={(vals) =>
                            vals
                              ? form.setValue("endTime", vals as Dayjs[])
                              : form.setValue("endTime", [])
                          }
                          value={
                            field.value
                              ? [field.value[0], field.value[1]]
                              : undefined
                          }

                          // className="hover:bg-red-400 bg-background"
                        />
                        {/* <RHFDatePickerField
                          placeholder="End Date"
                          control={form.control}
                          name="endTime"
                        /> */}
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  </div>
                )}
              />
            </div>
            {/* <SheetFooter>
              <SheetClose asChild> */}
            <Button>Save changes</Button>
            {/* </SheetClose>
            </SheetFooter> */}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
// interface RHFDatePickerFieldProps {
//   control: Control<any>;
//   name: string;
//   placeholder?: string;
// }

// const RHFDatePickerField = (props: RHFDatePickerFieldProps) => {
//   const [valus, setValues] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>([
//     dayjs("00:00:00", "HH:mm:ss"),
//     dayjs("00:00:00", "HH:mm:ss"),
//   ]);
//   console.log(valus);
//   return (
//     <Controller
//       control={props.control}
//       name={props.name}
//       rules={{
//         required: "This field is required",
//       }}
//       render={({ field, fieldState }) => {
//         return (
//           <>
//             <TimePicker.RangePicker

//               onChange={(vals) => form.setValue("endTime", vals)}
//               value={valus ? valus : undefined}
//             />
//             <br />
//             {fieldState.error ? (
//               <span style={{ color: "red" }}>{fieldState.error?.message}</span>
//             ) : null}
//           </>
//         );
//       }}
//     />
//   );
// };
