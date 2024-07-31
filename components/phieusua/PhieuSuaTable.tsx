"use client";
import useSWR from "swr";
import { DataTable } from "../data-table/data-table";
import { fetcher } from "../utils/fetcher";
import { columns } from "./columns";
import { AddLinhKien } from "../linhkien/addLinhKien";
import { AddPhieuSua } from "./addPhieuSua";

interface PostsTableProps {
  limit?: number;
  title?: string;
}

const PhieuSuaTable = ({ limit, title }: PostsTableProps) => {
  const { data, isLoading, error } = useSWR<ResponseData<PhieuSua[]>>(
    `http://localhost:8080/api/phieusua`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <AddPhieuSua/>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        // filterFields={filterFields}
      />
    </div>
  );
};

export default PhieuSuaTable;
