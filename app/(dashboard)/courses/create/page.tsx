"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import Loading from "@/app/loading";
import { courseApiRequests, CreateCourseBodyType } from "@/apiRequests/course";
// import { toast, useToast } from "@/components/ui/use-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateCourseBodyType>>({
    resolver: zodResolver(CreateCourseBodyType),
    defaultValues: {
      title: "",
    },
  });
  // const { toast } = useToast();
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: CreateCourseBodyType) => {
    try {
      const response = await courseApiRequests.createCourse(values);
      toast.success("Create Course Success!", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        router.push(`/courses/course-detail/${response.payload.data.id}`);
      }, 1200);
    } catch {
      toast.error("Something wrong !", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
          <h1 className="text-2xl">Name your course</h1>
          <p className="text-sm text-slate-600">
            What would you like to name your course? Don&apos;t worry, you can
            change this later.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Advanced web development'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Suspense>
  );
};

export default CreatePage;
