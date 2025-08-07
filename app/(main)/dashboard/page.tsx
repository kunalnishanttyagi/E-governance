// "use client" (if you're using Next.js with client-side components)
import DashboardCard from "../../../components/DashboardCard";
import NotificationApplications from "../../../components/NotificationApplications";
import Applications from "../../../components/Applications";
export default function ProfileSummary() {
  

  return (
    <main>
    <DashboardCard/>
    <NotificationApplications/>
    <Applications/>
    </main>
  );
}
