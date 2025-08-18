"use client";

import React, { useState } from "react";
import { Label } from "../../../../@/components/ui/label";
import { Input } from "../../../../@/components/ui/input";
import { Textarea } from "../../../../@/components/ui/textarea";
import { Button } from "../../../../@/components/ui/button";
import { toast } from "sonner";

export default function IssueReportForm() {
  const [formData, setFormData] = useState({
    description: "",
    department: "",
    image: null
  });

  const alldepartments = [
    "pradhan",
    "police",
    "dm",
    "secratory",
    "municipal",
    "electricity",
  ];

  // for description + department
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // for image
  const handleImageChange=(e)=> {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting issue report...", formData);

    if (!formData.description || !formData.department) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/userController", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendissue",
          userData: formData,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Issue submitted successfully");
        setFormData({ description: "", department: "", image: null });
      } else {
        toast.error(data.message || "Failed to submit. Try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-30 bg-black text-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Report an Issue</h2>

      <div className="space-y-4">
        {/* Description */}
        <div>
          <Label htmlFor="description">Issue Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail"
            className="mt-3"
          />
        </div>

        {/* Department */}
        <div>
          <Label htmlFor="department">Select Department</Label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="mt-3 p-2 rounded bg-gray-900 text-white w-full"
          >
            <option value="">Select...</option>
            {alldepartments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept.charAt(0).toUpperCase() + dept.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <Label htmlFor="image">Upload Image (optional)</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            className="mt-3"
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
          Submit
        </Button>
      </div>
    </div>
  );
}
