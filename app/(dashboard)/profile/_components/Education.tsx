"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Link as RouterLink, PlusCircle } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Edit from "@/app/_component/edit";
import { z } from "zod";
import { FileUpload } from "@/app/_component/file-upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProfileType } from "../page";
import { Empty } from "antd";
const formSchema = z.object({
  nameOrganization: z.string(),
  achievements: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  linkCredential: z.string(),
});
export interface EducationProps {
  data: ProfileType;
}
export default function Education({ data }: { data: ProfileType }) {
  const [isCreated, setIsCreated] = useState(false);
  const toggleEdit = () => setIsCreated((current) => !current);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameOrganization: "",
      achievements: "",
      startYear: "",
      endYear: "",
      linkCredential: "",
    },
  });
  return (
    <Card>
      <CardHeader className="space-y-1 p-3">
        <div className="font-medium flex items-center justify-between">
          Education Background & Certificates
          <Button onClick={toggleEdit} variant="ghost">
            {isCreated && <>Cancel</>}
            {/* {!isEditing && !initialData.imageUrl && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add an image
              </>
            )} */}
            {!isCreated && (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        {!isCreated && (
          <div className="flex flex-col gap-6 pt-[10px] w-full">
        
            {data.activities.length !== 0 ? (
              data.activities.map((item) => (
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-row gap-8 items-center">
                    <Avatar className="h-20 w-20 bg-white object-cover">
                      <AvatarImage
                        src={item.imageOrganization}
                        alt="@shadcn"
                        className=" "
                      />
                    </Avatar>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-lg ">{item.organization_name}</p>
                      </div>

                      <span className="text-sm text-gray-400">
                        {item.achivements}
                      </span>
                      <span className="text-sm text-gray-400">
                        {item.start_year} - {item.end_year}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-end">
                    <Edit />
                    <Link
                      isExternal
                      showAnchorIcon
                      anchorIcon={<RouterLink />}
                      href={item.link_credential}
                      className="text-[15px] text-blue-500 gap-2"
                      color="primary"
                    >
                      show credentials
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <Empty className="bg-background" />
            )}
          </div>
        )}
        {isCreated && (
          <div className="flex flex-row w-full items-center justify-center h-full gap-6">
            <div className="flex flex-col items-start h-[300px]">
              <FileUpload
                endpoint="imageUploader"
                onChange={(url) => {
                  console.log(url);
                  if (url) {
                    // onSubmit({ imageUrl: url });
                  }
                }}
              />
            </div>
            <Form {...form}>
              <form>
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="nameOrganization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Name of Organization"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="achievements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Achievements</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Achievements"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-row gap-2">
                    <FormField
                      control={form.control}
                      name="startYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Year</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Start Year"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Year</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="End Year"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="linkCredential"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Link Credential</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Link Credential"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
