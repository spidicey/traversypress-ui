"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SidebarNhanvien from "@/components/Sidebar-nhanvien";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const token = Cookies.get("token");
  const router = useRouter();

  // Check if the token is available, if not, redirect to login page
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  // Only proceed with decoding the token and rendering the layout if the token exists
  if (!token) {
    return null; // Avoid rendering layout while redirecting
  }

  const decodedToken = jwtDecode(token || "");
  // @ts-ignore
  const role = decodedToken.role;
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
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
