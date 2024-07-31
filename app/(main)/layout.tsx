"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SidebarNhanvien from "@/components/Sidebar-nhanvien";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get("token");
  console.log(token);
  const router = useRouter();
  if (!token) {
    router.push("/login");
  }
  const decodedToken = jwtDecode(token || "");
  // @ts-ignore
  const role = decodedToken.role;
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="hidden md:block h-[100vh] w-[300px]">
          {role === "nhân viên" ? <SidebarNhanvien /> : <Sidebar />}
        </div>
        <div className="p-5 w-full md:max-w-[1140px]">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
