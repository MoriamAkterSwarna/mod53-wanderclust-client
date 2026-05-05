"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const MyBookingsPage = () => {
  const userInfo = authClient.useSession();
  const user = userInfo.data?.user;
  const [bookings, setBookings] = useState([]);

  console.log(user);

  useEffect(() => {
    if (!user) return;
    const getBookings = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE}/api/bookings/user/${user?.id}`,
        
      );

      const data = await res.json();

      console.log(data);
      setBookings(data);
    };

    getBookings();
  }, [user]);

 

  return (
    <div className=" max-w-7xl mx-auto mb-20">
      <h2 className="text-3xl font-semibold mt-10">My Bookings </h2>
      <p className="text-muted">Manage and view your upcoming travel plans</p>

      <div className="lg:min-w-6xl md:min-w-4xl space-y-5 mt-5">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex gap-4 border items-center relative"
          >
            <div>
              <Image
                src={booking.imageUrl}
                height={300}
                width={400}
                alt={booking.destinationName}
                className="h-40 w-full object-cover overflow-hidden p-3"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold mt-2">
                {booking.destinationName}
              </h3>
              <p className="text-muted text-sm">
                {new Date(booking.departureDate).toLocaleDateString()}
              </p>
              <p className="text-muted text-sm">Booking ID: {booking._id}</p>
              <p className="text-3xl text-cyan-500 fonr-bold">
                ${booking.price}
              </p>
            </div>
            <Button
              variant="danger-soft"
              className={"rounded-none absolute right-10 bottom-5 "}
             
            >
              <FaTrash /> Cancel
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
