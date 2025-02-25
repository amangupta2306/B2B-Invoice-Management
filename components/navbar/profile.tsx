"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export const Profile = () => {
  const { data: session } = useSession();
  console.log(session, "session");

  const userImage = session?.user?.image || "/user.png";

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image
            src={userImage}
            alt="user-image"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
            priority
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex flex-col items-center gap-2">
            <div>
              <Image
                src={userImage}
                alt="User-Image"
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-center">
                {session?.user?.name}
              </h2>
              <p>{session?.user?.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <div
              onClick={() => signOut()}
              className="flex items-center gap-2 text-lg "
            >
              <LogOut size={20} />
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export const ProfilePictuture = () => {
  const { data: session } = useSession();
  console.log(session, "session");

  const userImage = session?.user?.image || "/user.png";

  return (
    <div className="flex items-center gap-2">
      <Image
        src={userImage}
        alt="user-image"
        width={50}
        height={50}
        className="rounded-lg cursor-pointer"
        priority
      />
      <div>
        <h2 className="">{session?.user?.name}</h2>
        <p>{session?.user?.email}</p>
      </div>
    </div>
  );
};
export const SignOut = () => {
  return (
    <div onClick={() => signOut()} className="flex items-center gap-2 text-lg ">
      <LogOut size={20} />
      Logout
    </div>
  );
};
