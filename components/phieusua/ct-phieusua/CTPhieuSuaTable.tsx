"use client";
import useSWR from "swr";
import { columns } from "./columns";
import { fetcher } from "@/components/utils/fetcher";
import { DataTable } from "@/components/data-table/data-table";

interface PostsTableProps {
  id?:number;
  limit?: number;
  title?: string;
}

const CTPhieuSuaTable = ({id, limit, title }: PostsTableProps) => {
  const { data, isLoading, error } = useSWR<ResponseData<CTPhieuSua[]>>(
    `http://localhost:8080/api/phieusua/details/phieusua/${id}`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  console.log(data?.data);
  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        // filterFields={filterFields}
      />
    </div>
  );
};

export default CTPhieuSuaTable;
