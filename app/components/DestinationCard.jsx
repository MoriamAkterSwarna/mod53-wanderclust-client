import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { LuMapPin } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { MdArrowOutward } from "react-icons/md";
const DestinationCard = ({ destination }) => {
  const { imageUrl, destinationName, price, duration, country } = destination;
  console.log(destination)
  return (
    <div className="border">
      <Image
        className="w-full h-48 object-cover"
        alt={destinationName}
        loading="eager"
        height={400}
        width={400}
        src={imageUrl}
      />

      <div className="mt-3 px-3">
        <div className="text-xs text-muted flex items-center gap-1">
          <LuMapPin /> {country}
        </div>
        <div className="flex  justify-between items-center mt-3">
          <div className="text-xl font-semibold">{destinationName}</div>
          <div className="text-xl">${price}/person</div>
        </div>
        <div className="text-xs text-muted flex items-center gap-1">
          {" "}
          <LuCalendarDays size={15} /> <span className="mt-1">{duration}</span>
        </div>
      </div>

     <Link href={`/destination/${destination._id}`}>
      <Button variant="ghost" className={"text-cyan-500 underline m-2"}>
        Book Now <MdArrowOutward />
      </Button>
     </Link>
    </div>
  );
};

export default DestinationCard;
