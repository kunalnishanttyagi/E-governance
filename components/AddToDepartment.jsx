"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function AdminForm() {
  const [aadhar, setAadhar] = useState("");
  const [departments, setDepartments] = useState("pradhan");

  const handleDeptChange = (dept) => {
    setDepartments(dept);
  };
  const alldepartments = ["pradhan", "police", "dm", "secratory", "municipal", "electricity"];
  const notificationForm={
    notification:"",
  }
  const handleChange=(e)=>{
    notificationForm.notification=e.target.value;
  }
  const sendNotification=async (e)=>{
    e.preventDefault();
    console.log(notificationForm);
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "sendNotification", notificationForm })
    });
    const data = await res.json();
    console.log(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with aadhar:", aadhar, "and departments:", departments);
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addToDepartment", aadhar, departments })
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className=" mt-12 flex flex-col items-center justify-centerr" >
        <form className=" mt-12  " onSubmit={handleSubmit}>
      <div className=" flex flex-col gap-5">
        <input
        type="text"
        placeholder="Aadhar Number"
        value={aadhar}
        onChange={(e) => setAadhar(e.target.value)}
      />
         <select
    htmlfor="departments"
    
    value={departments}
    onChange={(e) =>
        setDepartments(e.target.value)
    }
  >
    
    {alldepartments.map((dept) => { 
      return <option key={dept} className=" bg-black text-white" value={dept}>
        {dept}
      
    </option>
    }
    )}
  </select>
      </div>
      

      <button type="submit" className=" mt-5 p-2 bg-blue-800 " >Add Aadhar</button>
    </form>

    <form onSubmit={sendNotification} className=" mt-12" >
      <Label>Notification</Label>
      <Input className="" onChange={handleChange} ></Input>
      <Button type="submit" className="mt-5 p-2 bg-blue-800 ">Submit</Button>
    </form>

    </div>
  );
}
