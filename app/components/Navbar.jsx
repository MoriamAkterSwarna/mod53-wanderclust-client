"use client"
import Image from "next/image";
import Link from "next/link";
import logoImg from "../assets/logo.png";


const Navbar = () => {
  

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
     
          <>
            <Link href="/login" >Login</Link>
            <Link href="/signup">Signup</Link>
            </>
       
      </div>
    </div>
  );
};

export default Navbar;
