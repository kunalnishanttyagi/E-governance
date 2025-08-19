"use client"
import React, { useEffect, useState } from 'react'

import { BadgeCheck, Clock, AlertCircle } from "lucide-react";
import {useRouter} from 'next/navigation';
import {useUser} from "../context/UserContext";
const demoImage="https://laser360clinic.com/wp-content/uploads/2020/08/user-image.jpg";
// const user = {
  //   name: "Nishant Tyagi",
  //   gender: "Male",
  //   dob: "1999-05-12",
  //   email: "nishant@example.com",
  //   phone: "+91 9876543210",
  //   emailVerified: true,
  //   phoneVerified: false,
  //   address: "123 Shastri Nagar, Delhi, India",
  //   aadhaar: "XXXX-XXXX-1234",
  //   pan: "ABCDE1234F",
  //   voterId: "DEL1234567",
  //   status: "Verified", // Could be Verified, Incomplete, Pending
  //   photoUrl: "https://in.bmscdn.com/iedb/artist/images/website/poster/large/vijay_deverakonda_13416_27-07-2016_11-17-19.jpg", // Use a placeholder or actual photo URL
  // };

  const statusBadge = {
    Verified: <BadgeCheck className="text-green-600" />,
    Incomplete: <AlertCircle className="text-yellow-600" />,
    Pending: <Clock className="text-orange-500" />,
  };
 export function DashboardCard (){
  const router = useRouter();
  const {user}=useUser();
  const tempdata={
    // token:cookies().get("token").value
    name:"Nishant Tyagi",
  }
  useEffect(()=>{
    console.log("use effect called in dashboard card");
    console.log("user",user);
    // console.log("user",data);

    // setUser(data);
  //   // here i will make a request to fetch data in user 
  //   // now i will fetch user from database
  //   const fetchuser=async()=>{
  //     console.log("fetchuser called");
  //     const response = await fetch("/api/userController?action=getuser", {
  //         method: "GET",
  //         credentials: "include", // ✅ sends httpOnly cookies
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const data = await response.json();
  //       console.log("API Response:", data);
  //       if(!data.user){
  //         alert("User not found");
  //         router.push("/login");
  //       }
  //       setUser(data.user || null);
  //     // setUser(response.user);
  //   }
  //   fetchuser();
  },[user])
  return (
    <div className="max-w-7xl mt-24 mx-auto flex flex-wrap justify-around bg-gray-800 shadow-md rounded-xl p-6 border space-y-6">
      

      <div className=" flex flex-col gap-6 items-start">
        <div className=" flex justify-center items-center gap-6  ">
            <h2 className="text-2xl font-semibold text-white">🔷 Profile Summary</h2>
        
             <div className="flex items-center gap-2">
                <p className="text-sm text-white font-medium">Status:</p>
                <div className="flex items-center gap-1 font-semibold text-base">
                {statusBadge[user?.status]} <span>{user?.status}</span>
                </div>
            </div>
        </div>
        <img
          src={user?.profilePicture || demoImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-2 border-blue-500"
        />

        <div className="flex flex-col space-y-2">
          <p className="text-xl font-bold text-white">{user?.firstName+" "+user?.lastName}</p>
          <p className="text-white">👤 {user?.gender} | 🎂 {user?.dateOfBirth}</p>
          <p className="text-white">
            📧 {user?.email}{" "}
            {user?.emailVerified ? (
              <span className="text-green-600 ml-1">✔️ Verified</span>
            ) : (
              <span className="text-red-500 ml-1">❌ Not Verified</span>
            )}
          </p>
          <p className="text-white">
            📱 {user?.phone}{" "}
            {user?.phoneVerified ? (
              <span className="text-green-600 ml-1">✔️ Verified</span>
            ) : (
              <span className="text-red-500 ml-1">❌ Not Verified</span>
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-1 gap-10 ">
           
        <div>
            <p className="text-white">📍 <strong>Address:</strong> {user?.address}</p>
        <p className="text-white">🆔 <strong>Aadhaar:</strong> {user?.aadhar}</p>
        <p className="text-white">🧾 <strong>PAN:</strong> {user?.pancard}</p>
        <p className="text-white">🗳️ <strong>Voter ID:</strong> {user?.rationcard}</p>
        </div>
      </div>

      
    </div>
  )
}

export default DashboardCard
