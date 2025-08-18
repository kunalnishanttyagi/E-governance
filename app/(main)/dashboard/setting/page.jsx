"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    email: "",
    profilePicture: "",
    pancard: "",
    rationcard: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("address", formData.address);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("profilePicture", formData.profilePicture);
    form.append("pancard", formData.pancard);
    form.append("rationcard", formData.rationcard);
    console.log(formData);
    try {
      const res = await fetch("/api/userController", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // tells server we're sending JSON
      },
      body: JSON.stringify({ action:"updateProfile", userData: formData}), // convert JS object to JSON string
    
    })
    const data=await res.json();
    console.log(data);
      
    } catch (err) {
      console.error(err);
    //   alert("Error updating profile");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-black mt-20 shadow-lg rounded-lg ">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>


        {/* Ratio Card */}
        <div>
          <label className="block text-sm font-medium mb-1">Ration Card</label>
          <input
            type="text"
            name="rationcard"
            value={formData.rationcard}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Pan Card */}
        <div>
          <label className="block text-sm font-medium mb-1">Pan Card</label>
          <input
            type="text"
            name="pancard"
            value={formData.pancard}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>


        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium mb-1">Profile Picture</label>
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
