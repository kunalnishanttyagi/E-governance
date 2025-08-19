"use client";

import React, { useState } from "react";
import { Label } from "../../../../@/components/ui/label";
import { Input } from "../../../../@/components/ui/input";
import { Textarea } from "../../../../@/components/ui/textarea";
import { Button } from "../../../../@/components/ui/button";
import { toast } from "sonner";
import { set } from "mongoose";

export default function IssueReportForm() {
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

  const FREQUENCIES = ["Daily", "Weekly", "Occasional"];

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    description: "",
    symptoms: [],
    frequency: "",
    image: null,
  });

  // generic change (text/number/select)
  const handleChange = (
    e
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  // toggle symptom selection
  const toggleSymptom = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  // gender selection
  const selectGender = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  // submit
  const handleSubmit = async () => {
    console.log("Submitting medical help request...", formData);

    if (!formData.age || !formData.gender || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("/api/userController", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "getmedicalhelp",
          userData: formData,
        }),
      });

      const data = await res.json();
      console.log(data);
      setMedicalSolution(data.solution);
      if (res.ok) {
        toast.success("Medical help request submitted!");
        // setFormData({
        //   age: "",
        //   gender: "",
        //   description: "",
        //   symptoms: [],
        //   frequency: "",
        //   image: null,
        // });
      } else {
        toast.error(data.message || "Failed to submit. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };
  const [medicalSolution, setMedicalSolution] = useState("");

  return (
    <div className="max-w-xl mx-auto p-6 mt-20 bg-black text-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Medical Help Request</h2>

      {/* Age */}
      <div className="mb-4">
        <Label className="block mb-1">Age</Label>
        <Input
          type="number"
          min="0"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter your age"
        />
      </div>

      {/* Gender */}
      <div className="mb-4">
        <Label className="block mb-1">Gender</Label>
        <div className="flex gap-3">
          {["Male", "Female", "Other"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => selectGender(option)}
              className={`px-4 py-2 rounded-full border ${
                formData.gender === option
                  ? "bg-gray-600 text-white"
                  : "bg-black hover:bg-gray-600"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Issue Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your issue in detail"
          className="mt-2"
        />
      </div>

      {/* Symptoms */}
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Select Your Symptoms</h3>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((symptom) => (
            <button
              key={symptom}
              type="button"
              onClick={() => toggleSymptom(symptom)}
              className={`px-3 py-1 rounded-full border ${
                formData.symptoms.includes(symptom)
                  ? "bg-gray-600 text-white"
                  : "bg-black text-white hover:bg-gray-600"
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      {/* Frequency */}
      <div className="mb-4">
        <Label htmlFor="frequency">Select Frequency</Label>
        <select
          id="frequency"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          className="mt-2 p-2 rounded bg-gray-900 text-white w-full"
        >
          <option value="">Select...</option>
          {FREQUENCIES.map((freq, idx) => (
            <option key={idx} value={freq}>
              {freq}
            </option>
          ))}
        </select>
      </div>

      {/* Image */}
      <div className="mb-4">
        <Label htmlFor="image">Upload Image (optional)</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          className="mt-2"
          onChange={handleImageChange}
        />
        {formData.image && (
          <p className="text-sm text-gray-300 mt-1">
            Selected: <strong>{formData.image.name}</strong>
          </p>
        )}
      </div>

      {/* Submit */}
      <Button onClick={handleSubmit} className="w-full">
        Submit Request
      </Button>

      {
        medicalSolution &&
        <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Medical Solution</h1>
      
        <div className="bg-black-100 p-4 rounded-lg shadow">
          <p className="whitespace-pre-line">{medicalSolution}</p>
        </div>
      
    </div>
      }
    </div>
  );
}
