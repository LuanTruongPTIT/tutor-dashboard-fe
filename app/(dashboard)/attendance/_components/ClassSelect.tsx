"use client";
import { tutorApiRequests } from "@/apiRequests/tutor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useEffect, useState } from "react";

// interface ClassSelectProps {
//   selectClass: (value: ChangeEvent<HTMLSelectElement>) => void;
// }
export default function ClassSelect({ selectClass }: { selectClass: any }) {
  const [room, setRoom] = useState<any[]>([]);

  useEffect(() => {
    GetAllClassOfTutor();
  }, []);
  const GetAllClassOfTutor = async () => {
    tutorApiRequests.GetAllClassByTutor().then((res) => {
      setRoom(res.payload.data.class);
    });
    // const data = await tutorApiRequests.GetAllClassByTutor();
    // setRoom(data.payload.data.class);
  };

  return (
    <div>
      <Select
        // className="p-2 border rounded-lg"

        onValueChange={(value) => selectClass(value)}
      >
        {/* {room.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))} */}
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder="Select a class"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              selectClass(e.target.value)
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {room.map((item, index) => (
              <SelectItem key={index} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
