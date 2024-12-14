"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import posts from "@/data/posts";
import { Post } from "@/types/posts";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { AddPhieuNhap } from "./addPhieuNhap";
import { columns } from "./columns";
import { DataTable } from "../data-table/data-table";

interface PostsTableProps {
  limit?: number;
  title?: string;
}

const PhieuNhapTable = ({ limit, title }: PostsTableProps) => {
  const { data, isLoading, error } = useSWR<ResponseData<PhieuNhap[]>>(
    `http://localhost:8080/api/kho/phieunhap`,
    fetcher
  );
  if (isLoading) return <div>Đang tải...</div>;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <AddPhieuNhap />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        // filterFields={filterFields}
      />
    </div>
  );
};

export default PhieuNhapTable;
