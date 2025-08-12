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
  const alldepartments = ["pradhan", "police", "dm", "secratory", "municipal", "electricity"];

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting issue report...",description, department, image);
    if (!description || !department) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("department", department);
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

  return (
    <div className="max-w-xl mx-auto p-6 mt-30 bg-black rounded-xl shadow">
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

        <div>
            <Label htmlFor="department">Select Department</Label>
            <select className="mt-3" onChange={(e) => setDepartment(e.target.value)}>
                {
                    alldepartments.map((dept,index)=>{
                        return (
                            <option key={index} value={dept} className=" bg-black text-white rounded-2xl">
                                {dept.charAt(0).toUpperCase() + dept.slice(1)}
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
