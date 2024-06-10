"use client";

import { Button } from "@/components/ui/button";
import moment from "moment";
import React, { useState } from "react";
import AttendanceGrid from "./_components/AttendanceGrid";
import MonthSelection from "@/app/_component/month-selection";
import ClassSelect from "./_components/ClassSelect";
import { tutorApiRequests } from "@/apiRequests/tutor";
// const attendanceList = [
//   {
//     attendance_id: 1,
//     // date: "05/2024",
//     // day: 23,
//     room: "Python - D19",
//     // present: true,
//     studentId: 2,
//   },
// ];
function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceList, setAttendceList] = useState();
  const onSearchHandler = () => {
    const month = moment(selectedMonth).format("MM/YYYY");
    tutorApiRequests
      .GetAttendanceByClassAndDate({ room: selectedClass, date: month })
      .then((resp) => {
        console.log(resp);
        setAttendceList(resp.payload.data.attendance);
      });
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      <div className="flex gap-5 my-5 p-5 border rounded-lg shadow-sm">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection
            selectedMonth={(value: any) => setSelectedMonth(value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Class:</label>
          <ClassSelect selectClass={(v: any) => setSelectedClass(v)} />
        </div>
        <Button onClick={() => onSearchHandler()}>Search</Button>
      </div>
      <AttendanceGrid
        attadanceList={attendanceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
}

export default Attendance;
