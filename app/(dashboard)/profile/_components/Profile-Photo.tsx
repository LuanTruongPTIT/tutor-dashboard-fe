"use client";
import { FileUpload } from "@/app/_component/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chip } from "@nextui-org/react";
import { ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProfileType } from "../page";

const formSchema = z.object({
  fullName: z.string().min(1, {
    message: "Name is required",
  }),
});
export interface ProfilePhotoProps {
  data: ProfileType;
}
export default function ProfilePhoto({ data }: { data: ProfileType }) {
  console.log(data);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: data?.fullName ? data?.fullName : "",
    },
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="font-medium flex items-center justify-between">
          Profile Photo
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing && <>Cancel</>}
            {/* {!isEditing && !initialData.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
              </>
            )} */}
            {!isEditing && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit image
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {isEditing && (
            // <div className="h-[20px]">
            <FileUpload
              endpoint="imageUploader"
              onChange={(url) => {
                console.log(url);
                if (url) {
                  // onSubmit({ imageUrl: url });
                }
              }}
            />
            // </div>
          )}
          {!isEditing && (
            <div className="relative w-full h-[150px] mt-2">
              {data?.imagePhoto ? (
                <Image
                  alt="Upload"
                  fill
                  className="object-cover rounded-md"
                  src="/images/profile.png"
                />
              ) : (
                <>
                  <div className="mt-2 flex flex-row w-full items-center justify-center h-full">
                    <ImageIcon className="h-10 w-10 text-slate-500" />
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-1 w-full">
              {isEditing && (
                <Form {...form}>
                  <form>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="w-full pt-[5px]">
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Ex.g Theresa Flores"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end justify-start gap-x-2 pt-[10px]">
                      <Button type="submit">Save</Button>
                    </div>
                  </form>
                </Form>
              )}
              {!isEditing && (
                <h3 className="font-bold text-xl">{data?.fullName}</h3>
              )}
              {!isEditing && (
                <span className="text-[14px] text-gray-40">
                  Tutor in Center Preply
                </span>
              )}
            </div>
            {!isEditing && (
              <Chip color="success" variant="bordered">
                Vefify
              </Chip>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
