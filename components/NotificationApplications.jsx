"use client";
import { Clock, CheckCircle2, XCircle, Pencil, Eye, RefreshCcw, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function NotificationApplications() {
  const { user } = useUser();
  const [notifications, setNotifications] = useState([]);

  // Load notifications from user
  useEffect(() => {
    if (user && user.notifications) {
      // map strings to objects so UI remains consistent
      const formatted = user.notifications.map((msg, index) => ({
        id: index,
        message: msg,
      }));
      console.log("formatted notifications", formatted);
      setNotifications(formatted);
    }
  }, [user]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((note) => note.id !== id));
    // later: also call backend API to remove notification from DB
  };

  const applications = [
    {
      name: "PAN Card Update",
      date: "2025-07-28",
      status: "Pending",
      expected: "3–5 working days",
    },
    {
      name: "Aadhaar Address Change",
      date: "2025-07-10",
      status: "Approved",
      expected: "Completed",
    },
    {
      name: "Voter ID Correction",
      date: "2025-06-25",
      status: "Rejected",
      expected: "N/A",
    },
  ];

  const statusBadge = {
    Pending: (
      <span className="text-yellow-600 font-medium inline-flex items-center">
        <Clock className="w-4 h-4 mr-1" /> Pending
      </span>
    ),
    Approved: (
      <span className="text-green-600 font-medium inline-flex items-center">
        <CheckCircle2 className="w-4 h-4 mr-1" /> Approved
      </span>
    ),
    Rejected: (
      <span className="text-red-600 font-medium inline-flex items-center">
        <XCircle className="w-4 h-4 mr-1" /> Rejected
      </span>
    ),
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 mt-8">
      {/* 📬 Notifications & Alerts */}
      <div className="bg-gray-800 shadow rounded-xl p-6 border">
        <h2 className="text-xl font-semibold text-white mb-4">📬 Notifications & Alerts</h2>
        <ul className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((note) => (
              <li
                key={note.id}
                className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md text-gray-700 flex items-start gap-2"
              >
                <Bell className="w-5 h-5 text-blue-500 mt-1" />
                <div className="flex justify-between w-full">
                  <span>{note.message}</span>
                  <button
                    onClick={() => removeNotification(note.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Dismiss
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-400">No new notifications</p>
          )}
        </ul>
      </div>

      {/* 🛠️ Active Applications */}
      <div className="bg-gray-800 shadow rounded-xl p-6 border">
        <h2 className="text-xl font-semibold text-white mb-4">🛠️ Active Applications</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                <th className="px-4 py-2">Application</th>
                <th className="px-4 py-2">Submitted</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Expected Time</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applications.map((app, i) => (
                <tr key={i} className="hover:bg-gray-50 hover:text-black">
                  <td className="px-4 py-3">{app.name}</td>
                  <td className="px-4 py-3">{app.date}</td>
                  <td className="px-4 py-3">{statusBadge[app.status]}</td>
                  <td className="px-4 py-3">{app.expected}</td>
                  <td className="px-4 py-3 flex gap-5">
                    <button className="text-blue-600 hover:underline inline-flex items-center">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </button>
                    {app.status === "Rejected" && (
                      <button className="text-red-600 hover:underline inline-flex items-center">
                        <RefreshCcw className="w-4 h-4 mr-1" /> Re-submit
                      </button>
                    )}
                    {app.status === "Pending" && (
                      <button className="text-white hover:underline inline-flex items-center">
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
