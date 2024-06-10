import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div className="flex flex-row gap-x-2 items-center h-[20px]">
      <Progress
        className="h-2 transition-colors transition-width duration-300 ease-in-out"
        value={value}
        variant={variant}
      />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700 pb-[8px] ",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value)}%
      </p>
    </div>
  );
};
