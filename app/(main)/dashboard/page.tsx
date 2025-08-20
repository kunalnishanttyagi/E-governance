"use client";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../../lib/auth";
import { useRouter } from "next/navigation";
// const [user, setUser] = useState(null);
// "use client" (if you're using Next.js with client-side components)
import DashboardCard from "../../../components/DashboardCard";
import NotificationApplications from "../../../components/NotificationApplications";
import Applications from "../../../components/Applications";
import { useUser } from "../../../context/UserContext";
export default function ProfileSummary() {
  const {user,setUser}=useUser();
const router=useRouter();
useEffect(() => {
  // getCurrentUser().then(user => {
  //   console.log("user",user);
  //   if (!user) router.push("/login");
  //   else setUser(user);
  // });
  const fetchUser = async () => {
      console.log("fetching user...");
      const data = await getCurrentUser();
      console.log("response after running get current user :", data);
      // console.log(data);
      if (data) {
        console.log("user data after login called", data);
      setUser(data);
      } else {
        
        // router.push("/login");
      }
    
  }
  fetchUser()
}, []);

  return (
    <main>
    <DashboardCard />
    <NotificationApplications/>
    <Applications />
    </main>
  );
}
