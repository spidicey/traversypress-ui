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

interface PostsTableProps {
  title?: string;
}
interface PhieuHenProps {
  idPhieuHen: number;
  ngayHen: string;
  trangThai: string;
  khachHang: {
    tenKhachHang: string;
  };
  nhanVien: {
    hoTen: string;
  };
  category: {
    loai: string;
  };
}
const PhieuHenTable = ({ title }: PostsTableProps) => {
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
          label: "Đang chờ",
          value: "Đã hủy",
        },
      ],
    },
  ];
  const { data, isLoading, error } = useSWR<ResponseData<PhieuHen[]>>(
    `http://localhost:8080/api/phieuhen`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <AddPhieuNhap />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        filterFields={filterFields}
      />
    </div>
  );
};

export default PhieuHenTable;
