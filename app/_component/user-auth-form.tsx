"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { authApiRequests, TypeResponseLogin } from "@/apiRequests/auth";
// import { toast } from "sonner";
import { useUser } from "@/context/app.context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginSchema = z.object({
  email: z
    .string()
    .email()
    .refine((value) => value.trim().length > 0),
  password: z.string().min(6),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [messError, setMessError] = React.useState<string>("");
  const { setProfile } = useUser();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      try {
        const result = await authApiRequests.login(data);
        return result;
      } catch (error: any) {
        console.log(error.payload.message);
        throw new Error(error.payload.message);
      }
    },
    onSuccess: async (data: any) => {
      console.log(data);
      await fetch("http://localhost:3001/api/auth", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      setProfile(data.payload.user);
      router.push("/schedule");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>, event: any) {
    event.preventDefault();
    setIsLoading(true);

    loginMutation.mutate(data);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Form {...form}>
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      {...field}
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Password"
                      {...field}
                      type="password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="outline" type="button" disabled={isLoading}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          GitHub
        </Button>
      </div>
    </Form>
  );
}
