"use client";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter;
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();
  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Chapter unpublished");
      } else {
        // await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Chapter published");
        confetti.onOpen();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button onClick={onClick} disabled={disabled} variant="outline" size="sm">
        {!isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button size="sm">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};
