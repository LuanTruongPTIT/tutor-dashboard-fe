import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from "moment";
import { toast } from "react-hot-toast";
import { tutorApiRequests } from "@/apiRequests/tutor";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({
  attadanceList,
  selectedMonth,
}: {
  attadanceList?: any;
  selectedMonth: any;
}) {
  const [rowData, setRowData] = useState<any>();
  const [colDefs, setColDefs] = useState<any>();

  const daysInMonth = (year: any, month: any) =>
    new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(
    moment(selectedMonth).format("yyyy"),
    moment(selectedMonth).format("MM")
  );
  let daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);

  useEffect(() => {
    setColDefs([
      { field: "studentId", filter: true },
      { field: "classId", filter: true },
      { field: "Class", filter: true },
      { field: "name", filter: true },
    ]);
    if (attadanceList) {
      const userList = getUniqueRecord();
      setRowData(userList);

      daysArrays.forEach((date) => {
        setColDefs((prevData: any) => [
          ...prevData,
          {
            field: date.toString(),
            width: 50,
            editable: true,
          },
        ]);

        userList.forEach((obj) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attadanceList]);
  const isPresent = (studentId: any, day: any) => {
    const result = attadanceList.find(
      (item: any) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

  const getUniqueRecord = () => {
    const uniqueRecord: any[] = [];
    const existingUser = new Set();

    attadanceList?.forEach((record: any) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });

    return uniqueRecord;
  };
  const onMarkAttendace = async (
    day: any,
    studentId: any,
    presentStatus: any,
    class_id: any
  ) => {
    console.log(day, studentId, presentStatus, class_id);
    const date = moment(selectedMonth).format("MM/yyyy");
    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentStatus,
        date: date,
        room_id: class_id,
      };
      console.log(data);
      try {
        await tutorApiRequests.MarkAttendance(data);
        toast("Student Id:" + studentId + " Marked as present");
      } catch (error: any) {
        console.log(error);
        toast.error(error.payload.message);
      }
    } else {
      // GlobalApi.MarkAbsent(studentId, day, date).then((resp) => {
      //   toast("Student Id:" + studentId + " Marked as absent");
      // });
    }
  };
  return (
    <div>
      <div
        className="bg-background text-foreground ag-theme-quartz"
        style={{ height: 500 }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendace(
              e.colDef.field,
              e.data.studentId,
              e.newValue,
              e.data.classId
            )
          }
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
