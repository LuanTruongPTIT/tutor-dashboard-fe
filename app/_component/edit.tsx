import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { FileUpload } from "./file-upload";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  nameOrganization: z.string(),
  achievements: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  linkCredential: z.string(),
});
export type EditValue = {
  organization_name: string;
  achievements: string;
  start_year: string;
  end_year: string;
  credential_link: string;
  imageOrganization: string;
};
export default function Edit() {
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-3xl w-[50%]">
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex w-[100px] h-[100px]">
            {/* <Avatar> */}
            <FileUpload
              endpoint="imageUploader"
              onChange={(url) => {
                console.log(url);
                if (url) {
                  // onSubmit({ imageUrl: url });
                }
              }}
            />
            {/* </Avatar> */}
          </div>
        </div>
        <Form {...form}>
          <form>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="nameOrganization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of Organization" {...field} />
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
                      <Input placeholder="Achievements" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
                    <FormControl>
                      <Input placeholder="Start Year" {...field} />
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
                      <Input placeholder="End Year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkCredential"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Credential</FormLabel>
                    <FormControl>
                      <Input placeholder="Link Credential" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
