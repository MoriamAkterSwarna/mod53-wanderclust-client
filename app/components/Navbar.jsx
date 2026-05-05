"use client"
import Image from "next/image";
import Link from "next/link";
import logoImg from "../assets/logo.png";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { Button } from "@heroui/react";


const Navbar = () => {

   const userInfo = authClient.useSession();
  const user = userInfo.data?.user;


  

  return (
    <div className="flex justify-between items-center p-5 bg-white" >
      <div className="flex gap-3">
        <Link  href={"/"}>Home</Link>
        <Link  href={"/destination"}>Destination</Link>
        <Link  href={"/my-bookings"}>My Bookings</Link>
        <Link  href={"/add-destination"}>Add Destinations</Link>
      </div>

      <div>
        <Image
          loading="eager"
          className="h-auto w-auto"
          src={logoImg}
          height={150}
          width={150}
          alt="logo"
        />
      </div>
      <div className="flex gap-3 items-center">
        <Link  href={"/profile"}>Profile</Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Avatar size="sm">
              <Avatar.Image
                referrerPolicy="no-referrer"
                alt={user.name}
                src={user?.image}
              />
              <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
            </Avatar>

            <Button
              
              variant="danger-soft"
              size="sm"
              className={"rounded-none"}
            >
              SignOut
            </Button>
          </div>
        ) : (
          <>
            <Link  href={"/login"}>Login</Link>
            <Link  href={"/signup"}>Signup</Link>
          </>
        )}
      </div>
      
    </div>
  );
};

export default Navbar;
