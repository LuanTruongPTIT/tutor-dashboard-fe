"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "./file-upload";
import { Course } from "@/constants/data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseApiRequests } from "@/apiRequests/course";

interface ImageFormProps {
  initialData: Course;
  // initialData: string;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
  const useUpdateImage = useMutation({
    mutationFn: async (values: { imageUrl: string }) => {
      try {
        return await courseApiRequests.courseUpdate(Number(courseId), values);
      } catch (error: any) {
        throw new Error(error.payload.message);
      }
    },
    onSuccess: async (result: any) => {
      const data = result.payload.data.course;
      toast.success("Update description success!");
      toggleEdit();
      await queryClient.setQueryData(["courses", courseId], (oldData: any) => {
        oldData.payload.data.course.imageUrl = data.imageUrl;
        return {
          ...oldData,
        };
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    useUpdateImage.mutate(values);
  };

  return (
    <div className="mt-6 border  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60  rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData?.imageUrl ?? ""}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="imageUploader"
            onChange={(url) => {
              console.log(url);
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
