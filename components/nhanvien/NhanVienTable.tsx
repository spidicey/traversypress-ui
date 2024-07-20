"use client";
import { AddPhieuNhap } from "@/components/phieunhap/addPhieuNhap";

import { fetcher } from "@/components/utils/fetcher";
import useSWR from "swr";
import { columns } from "./columns";
import { DataTable } from "../data-table/data-table";
import { DataTableFilterField } from "@/types";
import { AddNhanVien } from "./addNhanVien";

interface PostsTableProps {
  title?: string;
}

const NhanVienTable = ({ title }: PostsTableProps) => {
  const filterFields: DataTableFilterField<NhanVien>[] = [];
  const { data, isLoading, error } = useSWR<ResponseData<NhanVien[]>>(
    `http://localhost:8080/api/auth/nhanvien`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  console.log(data?.data.at(0)?.taiKhoan.tk);
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <AddNhanVien />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        filterFields={filterFields}
      />
    </div>
  );
};
``;

export default NhanVienTable;
