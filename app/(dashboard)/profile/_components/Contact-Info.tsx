"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Pencil, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProfileType } from "../page";
export interface ContactInfoProps {
  data: ProfileType;
}
const formSchema = z.object({
  address: z.string(),
  email: z.string(),
  phone_number: z.string(),
});
export default function ContactInfo({ data }: { data: ProfileType }) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      email: "",
      phone_number: "",
    },
  });
  return (
    <Card>
      <CardHeader className="space-y-1 p-3">
        <div className="font-medium flex items-center justify-between">
          Contact Info
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
                Edit info
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!isEditing && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <p className="text-[16px] text-gray-500">Location</p>
              <div className="flex flex-row gap-2 items-center">
                <MapPin className="h-[19px] text-blue-500" />
                {data.address ? (
                  <span className="text-[16px">{data.address}</span>
                ) : (
                  <span className="text-[16px]">No address</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <p className="text-[16px] text-gray-500">Emaill Address</p>
              <div className="flex flex-row gap-2 items-center">
                <Mail className="h-[19px] text-blue-500" />
                {data.email ? (
                  <span className="text-[16px">{data.email}</span>
                ) : (
                  <span className="text-[16px]">No email</span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[16px] text-gray-500">Phone Number</p>
              <div className="flex flex-row gap-2">
                <Phone className="h-[19px] text-blue-500" />
                {data.phone_number ? (
                  <span className="text-[16px">{data.phone_number}</span>
                ) : (
                  <span className="text-[16px]">No phone number</span>
                )}
              </div>
            </div>
          </div>
        )}
        {isEditing && (
          <div className="flex flex-col gap-2">
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="District 9, Thu Duc City"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tutor@gmail.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="(+84) 335 219 807"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-[10px]">
                  Save
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
