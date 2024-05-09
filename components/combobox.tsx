"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [valueSubject, setValueSubject] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {valueSubject
            ? subjects.find((subject) => subject.value === valueSubject)?.label
            : "Select subject..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search subject..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {subjects.map((subject) => (
              <CommandItem
                key={subject.value}
                value={subject.value}
                onSelect={(currentValue) => {
                  setValueSubject(
                    currentValue === valueSubject ? "" : currentValue
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    valueSubject === subject.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {subject.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
