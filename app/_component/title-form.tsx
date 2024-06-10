"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Course } from "@/constants/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseApiRequests } from "@/apiRequests/course";

interface TitleFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

export const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;
  const useUpdateTitle = useMutation({
    mutationFn: async (values: { title: string }) => {
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
        oldData.payload.data.course.title = data.title;
        return {
          ...oldData,
        };
      });
    },
    onError: (error: any) => {
      toast.error("Something went wrong");
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    useUpdateTitle.mutate(values);
  };

  return (
    <div className="mt-6 border  rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
