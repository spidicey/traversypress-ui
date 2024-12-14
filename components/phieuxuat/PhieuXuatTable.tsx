"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import posts from "@/data/posts";
import { Post } from "@/types/posts";
import { UpdatePhieuXuat } from "./updatePhieuXuat";
import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { AddPhieuXuat } from "./addPhieuXuat";
import { DataTable } from "../data-table/data-table";
import { columns } from "./colunms";

interface PostsTableProps {
  limit?: number;
  title?: string;
}

const PhieuXuatTable = ({ limit, title }: PostsTableProps) => {
  const [phieuHenData, setPhieuHenData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // Sort posts in dec order based on date

  const { data, isLoading, error } = useSWR<ResponseData<PhieuXuat[]>>(
    `http://localhost:8080/api/kho/phieuxuat`,
    fetcher
  );
  if (isLoading) return <div>Đang tải...</div>;
  console.log(data?.data);
  const sortedPosts: Post[] = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const filteredPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts;

  return (
    <div className="mt-10">
      <h3 className="text-2xl mb-4 font-semibold">{title ? title : "Posts"}</h3>
      <AddPhieuXuat />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        // filterFields={filterFields}
      />
    </div>
  );
};

export default PhieuXuatTable;
