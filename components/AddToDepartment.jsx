"use client";
import { useState } from "react";

export default function AdminForm() {
  const [aadhar, setAadhar] = useState("");
  const [departments, setDepartments] = useState("pradhan");

  const handleDeptChange = (dept) => {
    setDepartments(dept);
  };
  const alldepartments = ["pradhan", "police", "dm", "secratory", "municipal", "electricity"];

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
    <div className=" mt-12 flex justify-center items-center" >
        <form className=" mt-12  " onSubmit={handleSubmit}>
      <div className=" flex gap-5">
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
      

      <button type="submit" className=" p-2 bg-blue-800 " >Add Aadhar</button>
    </form>
    </div>
  );
}
