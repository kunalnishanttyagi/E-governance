"use client";

import React, { useState } from "react";
import { Label } from "../../../../@/components/ui/label";
import { Input } from "../../../../@/components/ui/input";
import { Textarea } from "../../../../@/components/ui/textarea";
import { Button } from "../../../../@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../@/components/ui/select";
import { toast } from "sonner";

// type Props = {
//   departments: string[]; // e.g., ["Electricity", "Water", "Roads"]
// };
// ["pradhan","police","dm","secratory","municipal","electricity"]

export default function IssueReportForm() {
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
//   const alldepartments = ["pradhan", "police", "dm", "secratory", "municipal", "electricity"];
    const allFrequency = ["FirstTime", "OneWeek", "OneMonth", "More"];
const [frequency, setFrequency] = useState("");
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting issue report...",description, frequency, image,selected);
    if (!description || !frequency) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("frequency", frequency);
    formData.append("symptoms", JSON.stringify(selected));
    // formData.append("department", department);
    formData.append("age", age);
    formData.append("gender",gender);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const res = await fetch("/api/report-issue", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Issue submitted successfully");
        setDescription("");
        setDepartment("");
        setImage(null);
      } else {
        toast.error("Failed to submit. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const SYMPTOMS = [
  "Fever",
  "Vomiting",
  "Cough",
  "Headache",
  "Shortness of breath",
  "Fatigue",
  "Sore throat",
  "Chest pain",
];
  const [selected, setSelected] = useState([]);
  
  const [age, setAge] = useState('');
  const [gender, setGender] = useState("");

  const toggleSymptom = (symptom) => {
    setSelected(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };
//   const [age, setAge] = useState<number | ''>('');
//   const [gender, setGender] = useState<string>("");

  return (
    <div className="max-w-xl mx-auto p-6 mt-30 bg-black rounded-xl shadow">
        <div className=" max-w-md bg-black shadow rounded-md">
      <h2 className="text-xl font-semibold mb-4">Your Information</h2>

      {/* Age Input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Age</label>
        <input
          type="number"
          min="0"
          value={age}
          onChange={e => setAge(e.target.value === '' ? '' : parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter your age"
        />
      </div>

      {/* Gender Selection */}
      <div className="mb-4">
        <label className="block mb-1 bg-black font-medium">Gender</label>
        <div className="flex gap-3">
          {["Male", "Female", "Other"].map(option => (
            <button
              key={option}
              onClick={() => setGender(option)}
              type="button"
              className={`px-4 py-2 bg-black rounded-full border ${
                gender === option
                  ? "bg-blue-800 text-white"
                  : "bg-black hover:bg-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Output */}
      {/* <div className="mt-4 text-sm text-gray-700">
        {age !== '' && <p>Age: {age}</p>}
        {gender && <p>Gender: {gender}</p>}
      </div> */}
    </div>
        
      <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>

      <div className="space-y-4">
        <div>
          <Label htmlFor="description">Issue Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => { setDescription(e.target.value)}}
            placeholder="Describe the issue in detail"
            className="mt-3"
          />
        </div>

        <div className="  max-w-md">
      <h2 className="text-xl font-bold mb-2">Select Your Symptoms</h2>

      <div className="flex  flex-wrap gap-2 mb-4">
        {SYMPTOMS.map(symptom => (
          <button
            key={symptom}
            onClick={() => toggleSymptom(symptom)}
            className={`px-3 py-1 bg-black rounded-full border ${
              selected.includes(symptom)
                ? "bg-black text-white"
                : "bg-black hover:bg-gray-200"
            }`}
          >
            {symptom}
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <div>
          <h3 className="font-semibold mb-1">Selected Symptoms:</h3>
          <ul className="list-disc list-inside gap-3 flex bg-black text-sm text-white">
            {selected.map(symptom => (
              <h5 className=" " key={symptom}>{symptom}</h5>
            ))}
          </ul>
        </div>
      )}
    </div>

        <div>
            <Label htmlFor="frequency">Select Frequency</Label>
            <select className="mt-3" onChange={(e) => setFrequency(e.target.value)}>
                {
                    allFrequency.map((freq,index)=>{
                        return (
                            <option key={index} value={freq} className=" bg-black text-white rounded-2xl">
                                {freq.charAt(0).toUpperCase() + freq.slice(1)}
                            </option>
                        );
                    })
                }
            </select>
        </div>

        <div>
          <Label htmlFor="image">Upload Image (optional)</Label>
          <Input type="file" accept="image/*" className="mt-3" onChange={handleImageChange} />
          {image && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: <strong>{image.name}</strong>
            </p>
          )}
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Issue"}
        </Button>
      </div>
    </div>
  );
}
