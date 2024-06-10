"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleIcon, PlusIcon, StarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { Dialog } from "@headlessui/react";
import { useState } from "react";
import ModalViewDetailSchedule from "@/app/_component/modal-view-detail-schedule";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { DetailSchedule } from "./edit-schedule";

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
const status = [
  {
    value: "compelete",
    label: "Compelete",
  },
  {
    value: "start",
    label: "Start",
  },
  {
    value: "cancel",
    label: "Cancel",
  },
];

export default function Task() {
  const [isDelete, setIsDelete] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      {
        <Card>
          <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
            <div className="space-y-1">
              <CardTitle>Truong Luan - Student</CardTitle>
              <CardDescription>
                Beautifully designed components that you can copy and paste into
                your apps. Accessible. Customizable. Open Source.
              </CardDescription>
            </div>
            <div className="flex items-center space-x-1 rounded-md text-secondary-foreground">
              <DetailSchedule />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                Lịch học
              </div>
              <div className="flex items-center">
                <StarIcon className="mr-1 h-3 w-3" />
                Pending
              </div>
              <div>7/4/2024</div>
            </div>
          </CardContent>
        </Card>
      }
    </>
  );
}
