"use client";

import Carousel from "./ui/Carousel";
export default function Applications() {
  const slideData = [
    {
      title: "Applied Applications",
      button: "Check Status",
      src: "https://cdn-icons-png.flaticon.com/512/9299/9299861.png",
    },
    {
      title: "Apply for Documents",
      button: "Apply Now",
      src: "https://img.freepik.com/free-vector/document-vector-colorful-design_341269-1262.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      title: "Job Applications",
      button: "Apply Now",
      src: "https://static.vecteezy.com/system/resources/previews/000/169/145/non_2x/vector-cute-job-search-application-illustration.jpg",
    },
    {
      title: "Results",
      button: "Check Results",
      src: "https://yt3.googleusercontent.com/ytc/AIdro_n1yT11C4LU_ejHErcJ4-MNsSpJjtaSkdHjBdbuQq_-J4o=s900-c-k-c0x00ffffff-no-rj",
    },
    {
      title: "Government Schemes",
      button: "Check Schemes",
      src: "https://yt3.googleusercontent.com/ytc/AIdro_n1yT11C4LU_ejHErcJ4-MNsSpJjtaSkdHjBdbuQq_-J4o=s900-c-k-c0x00ffffff-no-rj",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
