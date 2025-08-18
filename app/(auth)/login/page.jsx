"use client";
import React, { use, useEffect, useState } from "react";
import { Label } from "../../../components/ui/label";
// import { toast } from "react-toastify";
// import { Input } from "../ui/input";
import { toast } from "sonner"

import { Input } from "../../../components/ui/input";
import { cn } from "../../../lib/utils";
import { useRouter } from "next/navigation";
import {App} from "../../../components/Toast"
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Button } from "../../../components/ui/button";
// import { Router } from "next/router";

export default function SignupFormDemo() {
    const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const router=useRouter();
  useEffect(()=>{
    console.log("checkUserExists called");
    const checkUserExists=async()=>{
      const res=await fetch("/api/userController?action=checkUserExists",{
        method:"GET",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
      });
      const data=await res.json();
      console.log("Response from checkUserExists API:", data);





      // change this at end








      
      // if(data.result) router.push("/dashboard");
    }
    checkUserExists();
    
  },[]);
  
const Router=useRouter();
  async function sendOtp(){
    console.log("Otp sent for:", userData.aadhar);
    const res = await fetch("/api/userController", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // tells server we're sending JSON
      },
      body: JSON.stringify({ action:"sendOtp", userData}), // convert JS object to JSON string
    }).then((res) => res.json()).catch((err) => {
      console.error("Error in sendOtp API:", err);
      return { error: "Failed to send OTP" };
    });
    console.log("Response from sendOtp API:", res);
  }
  // const toast=useToast();
  async function handleSubmit (e){
    e.preventDefault();
    console.log("Form submitted: trying to check otp", userData);
    const res = await fetch("/api/userController", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json", // tells server we're sending JSON
      },
      body: JSON.stringify({action:"checkOtp",userData}), // convert JS object to JSON string
    })
    const data = await res.json();
    console.log("Responsefrom checkOtp API:", data);
    
    // if(res.user){
    //   router.push("/dashboard");
    // }
    console.log("thisis the status", data);
    if (res.status == 200) {
      console.log("pushing to dashboard")
      // toast("Login successful");
      toast("Login Successful!")

      Router.push("/dashboard"); // ✅ Redirect
    } else {
      const data = await res.json();
      alert(data.message || "Invalid OTP");
    }
    console.log("Response from signup API:", res);
    

    console.log("Form submitted");
  };
  const [userData,setUserData]=useState({
    aadhar:"",
    otp:""
  })
  return (
    <div
      className="shadow-input mt-12 mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div>
            <LabelInputContainer className="mb-4 mt-2">
                <Label htmlFor="aadhar">Aadhar Number</Label>
                <Input id="aadhar" onChange={handleChange} name="aadhar" placeholder="123456789" type="aadhar" />
            </LabelInputContainer>
            <div className="mb-4">
                <button onClick={sendOtp} type="button"
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          >
          Send Otp
          <BottomGradient />
        </button>
                <LabelInputContainer className="mb-4 mt-4">
                <Label htmlFor="otp">Enter Otp</Label>
                <Input onChange={handleChange} name="otp" id="otp" placeholder="123-456" type="otp" />
            </LabelInputContainer>
            </div>
        </div>


         <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
