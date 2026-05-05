"use client";

import { authClient } from "@/lib/auth-client";
import { FaCheck } from "react-icons/fa";
import { Button, Card, DateField, Label, Separator } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight } from "react-icons/fa6";

const BookingCard = ({ destinationId, imageUrl, destinationName, price }) => {
  const [date, setDate] = useState(null);
  const userInfo = authClient.useSession();
  const user = userInfo.data?.user;

  const handleBooking = async () => {
    if (!date) {
      toast.error("Please select departure date!");
      return;
    }

    const bookingData = {
      userId: user.id,
    userName: user.name,
    userEmail: user.email,
      destinationId,
      imageUrl,
      destinationName,
      price,
      departureDate: new Date(date),
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE}/api/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      
        body: JSON.stringify(bookingData),
      },
    );

    const data = await res.json();
    console.log(data);
    if (data.acknowledged) {
      toast.success("You successfully booked this destination!");
    }
  };

  return (
    <Card className="col-span-2 border rounded-none">
      <p className="text-sm text-muted">Starting From</p>
      <p className="text-3xl font-bold text-cyan-500">
        ${price}
        <span className="text-muted text-sm">/person</span>
      </p>

      <DateField className="mt-3" name="date" onChange={setDate}>
        <Label>Departure Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>
      <Separator />
      <Button
        onClick={handleBooking}
        className="bg-cyan-500 rounded-none w-full"
      >
        Book Now <FaArrowRight />
      </Button>

      <ul className="mt-3 text-sm text-muted">
        <li className="flex items-center gap-2">
          <FaCheck className="text-green-500" />
          <p>Free cancellation up to 7 days</p>
        </li>

        <li className="flex items-center gap-2">
          <FaCheck className="text-green-500" />
          <p>Travel insurance included</p>
        </li>

        <li className="flex items-center gap-2">
          <FaCheck className="text-green-500" />
          <p>24/7 customer support</p>
        </li>
      </ul>
    </Card>
  );
};

export default BookingCard;
