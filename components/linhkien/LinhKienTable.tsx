"use client";
import { AddPhieuNhap } from "@/components/phieunhap/addPhieuNhap";

import { fetcher } from "@/components/utils/fetcher";
import useSWR from "swr";
import { columns } from "./columns";
import { DataTable } from "../data-table/data-table";
import { DataTableFilterField } from "@/types";

interface PostsTableProps {
  title?: string;
}

const LinhKienTable = ({ title }: PostsTableProps) => {
  const filterFields: DataTableFilterField<LinhKien>[] = [];
  const { data, isLoading, error } = useSWR<ResponseData<LinhKien[]>>(
    `http://localhost:8080/api/kho/linhkien`,
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
``;

export default LinhKienTable;
