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

const initialValues = {
  dateTime: new Date(),
  // description: "",
  // link: "",
};
export function DetailSchedule() {
  const [values, setValues] = useState(initialValues);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Detail</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-7">
          <div className="grid grid-row-4 items-center gap-4">
            <Label htmlFor="Topic" className="text-left">
              Topic
            </Label>
            <Input id="Topic" className="col-span-3" />
          </div>
          <div className="grid grid-row-4 items-center gap-4">
            <Label htmlFor="Description" className="text-left">
              Description
            </Label>
            <Textarea placeholder="Write description here....." />
          </div>
          <div className="grid grid-row-4 items-center gap-4 py-1">
            <Label htmlFor="Course" className="text-left">
              Courses
            </Label>
            <Input value="Math" />
          </div>
          <div className="grid grid-row-4 items-center gap-4 py-1">
            <Label htmlFor="Chapter" className="text-left">
              Chapter
            </Label>
            <Input value="Introduction to JavaScript" />
          </div>
          <div className="grid grid-row-4 items-center gap-4 py-1">
            <Label htmlFor="Courses" className="text-left">
              Date
            </Label>
            <Input value="2024-05-10	" />
          </div>
          <div className="grid grid-row-4 items-center gap-4 py-2">
            <Label htmlFor="Courses" className="text-left">
              Students
            </Label>
            <InviteStudent />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
