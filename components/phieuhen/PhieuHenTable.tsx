"use client";
import { AddPhieuNhap } from "@/components/phieunhap/addPhieuNhap";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetcher } from "@/components/utils/fetcher";
import useSWR from "swr";
import { columns } from "./columns";
import { DataTable } from "../data-table/data-table";
import { DataTableFilterField } from "@/types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface PostsTableProps {
  title?: string;
}
const PhieuHenTable = ({ title }: PostsTableProps) => {
  const token = Cookies.get("token");
  const decodedToken = jwtDecode(token || "");
  // @ts-ignore
  const username = decodedToken?.username;
  // @ts-ignore

  const role = decodedToken.role;

  const { data: NhanvienData } = useSWR<ResponseData<NhanVien>>(
    `http://localhost:8080/api/auth/nhanvien/username/${username}`,
    fetcher
  );
  let urlPhieuHen = "";
  if (role === "nhân viên") {
    urlPhieuHen = `http://localhost:8080/api/phieuhen/nhanvien/${NhanvienData?.data.idNhanVien}`;
  } else {
    urlPhieuHen = `http://localhost:8080/api/phieuhen`;
  }
  const filterFields: DataTableFilterField<PhieuHen>[] = [
    {
      label: "Nhân viên",
      value: "nhanVien",
      placeholder: "Nhập tên nhân viên",
    },
    {
      label: "Khách Hàng",
      value: "khachHang",
      placeholder: "Nhập tên khách hàng",
      // Assuming it's a text input filter; if it's a select, you might have options here
    },
    {
      label: "Trạng thái",
      value: "trangThai",
      placeholder: "Filter trạng thái...",
      options: [
        {
          label: "Đang chờ",
          value: "Đang chờ",
        },
        {
          label: "Hoàn thành",
          value: "Hoàn thành",
        },
        {
          label: "Đang huỷ",
          value: "Đã hủy",
        },
      ],
    },
  ];
  console.log(urlPhieuHen);
  const { data, isLoading, error } = useSWR<ResponseData<PhieuHen[]>>(
    urlPhieuHen,
    fetcher
  );
  if (isLoading) return <div>Đang tải...</div>;
  console.log(data?.data);
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  );
};

export default PhieuHenTable;
