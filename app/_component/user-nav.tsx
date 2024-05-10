"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// import { signOut, useSession } from "next-auth/react";
export function UserNav() {
  // const { data: session } = useSession();
  // if (session) {
  const { user } = useUser();
  console.log(user);
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserButton afterSignOutUrl="/sign-in" />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
// }
