import { Schedule, scheduleSchema } from "@/constants/data";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tutorApiRequests } from "@/apiRequests/tutor";
interface status {
  value: string;
  label: string;
  icon: any;
}
interface DataTableRowActionScheduleProps<TData> {
  row: Row<TData>;
  status: status[];
}
export function DataTableRowActionSchedule<TData>({
  row,
  status,
}: DataTableRowActionScheduleProps<TData>) {
  const schedule = scheduleSchema.parse(row.original);
  const queryClient = useQueryClient();
  const onRequestError = () => {
    toast.error("Update status failed");
  };
  const onUpdateSuccess = async (scheduleNew: any) => {
    const schedule = scheduleNew.payload.payload.schedule;

    await queryClient.setQueryData(["get-all-schedule"], (oldData?: any) => {
      if (oldData) {
        const schedules = oldData.payload.data.schedules.map(
          (scheduleOld: any) => {
            if (scheduleOld.id === schedule.id) {
              return {
                ...scheduleOld,
                status: schedule.status,
              };
            }
            return scheduleOld;
          }
        );
        toast.success("Update status successfully");
        return { payload: { data: { schedules } } };
      }
    });
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      tutorApiRequests.UpdateStatusSchedule({
        status: status,
        id: id,
      }) as unknown as Promise<Schedule>,
    onSuccess: onUpdateSuccess,
    onError: onRequestError,
    retry: 2,
  });

  async function processStatus(value: string) {
    updateMutation.mutate({ id: schedule.id, status: value });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={schedule.status}>
              {status.map((status) => (
                <DropdownMenuRadioItem
                  onClick={() => processStatus(status.value)}
                  key={status.value}
                  value={status.value}
                >
                  {status.label} 
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
