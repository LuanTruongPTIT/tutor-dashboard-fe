"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import Chip from "@mui/joy/Chip";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ProfileType } from "../page";
const formSchema = z.object({
  bio: z.string().min(1, {
    message: "Name is required",
  }),
});
export interface AboutMeProps {
  data: ProfileType;
}

export default function AboutMe({ data }: { data: ProfileType }) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
    },
  });
  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="font-medium flex items-center justify-between">
          About Me
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
                Edit Bio
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {isEditing && (
            <Form {...form}>
              <form>
                <FormField
                  name="bio"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          // disabled={isSubmitting}
                          placeholder="e.g. 'Hello, my name is...'"
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
          {!isEditing &&
            (data.bio ? (
              <p className="text-sm text-left text-gray-400">
                Hello, my name is Sela, and I am a dedicated tutor committed to
                helping students achieve their academic goals. If you have any
                specific details you want to include, such as subjects you teach
                or your teaching philosophy, feel free to let me know.
              </p>
            ) : (
              <p>This is where you can write a bio.</p>
            ))}
          <div className="w-full">
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex flex-row gap-2">
                <Chip
                  color="primary"
                  disabled={false}
                  onClick={function () {}}
                  size="lg"
                  variant="solid"
                  className="text-[14px]"
                >
                  English grammar
                </Chip>
                <Chip
                  color="primary"
                  disabled={false}
                  onClick={function () {}}
                  size="lg"
                  variant="solid"
                  className="text-[14px]"
                >
                  Online Education
                </Chip>
              </div>
              <div className="flex flex-row gap-2">
                <Chip
                  color="primary"
                  disabled={false}
                  onClick={function () {}}
                  size="lg"
                  variant="solid"
                  className="text-[14px]"
                >
                  Pre-school education
                </Chip>
                <Chip
                  color="primary"
                  disabled={false}
                  onClick={function () {}}
                  size="lg"
                  variant="solid"
                  className="text-[14px]"
                >
                  Vietnamese
                </Chip>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
