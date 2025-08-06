"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Services from "./Services"
import AnimatedTestimonialsDemo from "./Testimonials";
// import { Input } from "@/components/ui/input";
// here i will make a search option for user with a background image that will change every 5 seconds

const Front = () => {
  const images = [
    "tajmahal.webp",
    "indiagate.jpg",
    "redfort.webp",
    "buddha.jpg",
    "goldentemple.jpg",
    "lotustemple.jpg",
    "temple.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    alert(`You searched for: ${query}`);
    // Implement search logic here
  }
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= images.length) nextIndex = 0;
      setCurrentIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <div>
      <div
        className=" -z-20 h-screen w-full flex items-center justify-center bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      ></div>
      <div className="absolute top-0 h-screen w-screen gap-5 flex justify-center items-center">
        <div className="bg-white bg-opacity-80 p-2 rounded-3xl  shadow-md max-w-xl w-full text-center">
          {/* <h1 className="text-2xl font-bold mb-4">
            Search Government Services
          </h1> */}
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter service or keyword"
              className="w-full p-3 text-black focus:outline-none focus:ring-none "
            />
            <div className=" my-auto h-8 w-1 bg-gray-700" ></div>
            <button
              onClick={handleSearch}
              className=" flex justify-center items-center px-5  bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>



      {/*  this is the services section */}
      <Services/>
      <AnimatedTestimonialsDemo/>
    </div>
  );
};

export default Front;
