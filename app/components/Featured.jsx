"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowRight, FaMapPin, FaCalendar, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE}/api/featured-destinations`
        );
        const data = await res.json();
        setFeatured(data);
      } catch (error) {
        console.error("Failed to fetch featured destinations:", error);
      }
    };

    getFeatured();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Title */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            Featured Destinations
          </h2>
          <p className="text-muted mb-5">Handpicked travel experiences for the adventure seekers</p>
        </div>

        <Link href={'/destination'}>
          <Button variant="outline" className={'rounded-none text-cyan-500 border-cyan-500'}>
            All Destinations <FaArrowRight />
          </Button>
        </Link>
      </div>

      {/* Swiper Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{ clickable: true, type: "fraction" }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 25 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="featured-swiper"
          style={{
            paddingBottom: "80px",
          }}
        >
        {featured.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 h-full flex flex-col">
              {/* Image Container with Rating Badge */}
              <div className="relative h-64 w-full overflow-hidden group">
                <Image
                  src={item.imageUrl}
                  alt={item.destinationName}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {/* Rating Badge */}
                {item.rating && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <span className="font-bold text-gray-800">{item.rating}</span>
                    <FaStar className="text-yellow-400 w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaMapPin className="w-4 h-4 text-cyan-500" />
                  <span className="text-sm">{item.country}</span>
                </div>

                {/* Destination Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.destinationName}
                </h3>

                {/* Price */}
                {item.price && (
                  <div className="mb-3">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900">
                        ${item.price}
                      </span>
                      <span className="text-sm text-gray-600">/person</span>
                    </div>
                  </div>
                )}

                {/* Duration */}
                {item.duration && (
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <FaCalendar className="w-4 h-4 text-cyan-500" />
                    <span className="text-sm">{item.duration}</span>
                  </div>
                )}

                {/* Book Now Button */}
                <Link href={`/destination/${item._id}`} className="mt-auto">
                  <button className="text-cyan-500 font-semibold hover:text-cyan-600 transition flex items-center gap-2">
                    BOOK NOW
                    <FaArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        </Swiper>

        {/* Custom Navigation Buttons - Bottom Right */}
        <div className="flex gap-3 justify-end mt-6">
          <button className="swiper-button-prev-custom w-12 h-12 rounded-full border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next-custom w-12 h-12 rounded-full border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white transition flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;