import DashboardCard from "@/components/dashboard/DashboardCard";
import AnalyticsChart from "@/components/dashboard/AnalyticsChart";
import { Folder, MessageCircle, Newspaper, User } from "lucide-react";
import CustomChart from "@/components/dashboard/Chart";
import AppointmentChart from "@/components/dashboard/Chart2";
import Chart3 from "@/components/dashboard/Chart3";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly gap-5 mb-5">
        <DashboardCard
          title="Phiếu hẹn"
          count={28}
          icon={<Newspaper className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Khách Hàng"
          count={12}
          icon={<User className="text-slate-500" size={72} />}
        />
        {/* <DashboardCard
          title='Categories'
          count={12}
          icon={<Folder className='text-slate-500' size={72} />}
        /> */}

        {/* <DashboardCard
          title='Comments'
          count={1200}
          icon={<MessageCircle className='text-slate-500' size={72} />}
        /> */}
      </div>
      {/* <AnalyticsChart /> */}
      <CustomChart />
      <AppointmentChart />
      <Chart3 />
    </>
  );
}
