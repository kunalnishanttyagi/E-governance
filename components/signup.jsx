"use client";
import React, { use, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { cn } from "../lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export default function SignupFormDemo() {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const Router=useRouter();
  async function handleSubmit (e){
    e.preventDefault();
    console.log("Form submitted:", userData);
    const res = await fetch("/api/userController", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // tells server we're sending JSON
      },
      body: JSON.stringify({ action:"signup", userData}), // convert JS object to JSON string
    })
    const data=await res.json();

    if(data.user){
      console.log("pushing to dashboard")
      // toast("Login successful");
      toast("Signup Successful!")

      // Router.push("/dashboard"); // ✅ Redirect
    }
    console.log("Response from signup API:", data);
    

    console.log("Form submitted");
  };
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dateOfBirth:"",
    password: "",
    aadhar: "",
    phone: "",
    pancard: "",
    rationcard: "",
  })
  return (
    <div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to FelixN 
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to FelixN if you can because we don&apos;t have a login flow
        yet
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div
          className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" onChange={handleChange} name="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" name="lastname" onChange={handleChange} type="text" />
          </LabelInputContainer>
          
        </div>
        <LabelInputContainer>
            <Label htmlFor="dateOfBirth">Date oF Birth</Label>
            <Input id="dateOfBirth" placeholder="01-01-2009" name="dateOfBirth" onChange={handleChange} type="date" />
          </LabelInputContainer>
        <LabelInputContainer className="mb-4 mt-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" name="email" placeholder="projectmayhem@fc.com" onChange={handleChange} type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" email="password" name="password" placeholder="••••••••" onChange={handleChange} type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="aadhar">Aadhar Card Number</Label>
          <Input id="aadhar" placeholder="123456789" name="aadhar" onChange={handleChange} type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="phone"> Phone Number</Label>
          <Input id="phone" placeholder="123456789" name="phone" onChange={handleChange} type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="pancard"> Pan Card</Label>
          <Input id="pancard" placeholder="1234ABCD" name="pancard" onChange={handleChange} type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="rationcard"> Ration Card</Label>
          <Input id="rationcard" placeholder="12345" name="rationcard" onChange={handleChange} type="number" />
        </LabelInputContainer>
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

        {/* <div
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit">
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
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
