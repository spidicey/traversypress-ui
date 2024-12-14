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
import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { AddPhieuNhap } from "../phieunhap/addPhieuNhap";
import { UpdatePhieuXuat } from "../phieuxuat/updatePhieuXuat";

interface PostsTableProps {
  limit?: number;
  title?: string;
}

const PostsTable = ({ limit, title }: PostsTableProps) => {
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
      <AddPhieuNhap />
      <Table>
        <TableCaption>A list of recent posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead className="hidden md:table-cell">Ngay xuất</TableHead>
            <TableHead className="hidden md:table-cell">Tên sản phẩm</TableHead>
            <TableHead className="hidden md:table-cell ">Ghi chú</TableHead>
            <TableHead className="hidden md:table-cell ">Nhân viên</TableHead>

            <TableHead className="hidden md:table-cell text-right">
              Số lượng
            </TableHead>
            <TableHead>View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((post: PhieuXuat) => (
            <TableRow key={post.idPhieuXuat}>
              <TableCell>{post.idPhieuXuat}</TableCell>
              <TableCell className="hidden md:table-cell">
                {post.ngayCap.toString()}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {post.linhKien.tenSanPham}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {post.ghiChu}
              </TableCell>
              <TableCell className=" hidden md:table-cell">
                {post.nhanVien.hoTen}
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                {post.soLuong}
              </TableCell>
              <TableCell>
                <UpdatePhieuXuat idPhieuXuat={post.idPhieuXuat} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
