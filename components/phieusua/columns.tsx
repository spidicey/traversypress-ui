"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-columns-header";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { UpdatePhieuHen } from "../phieuhen/updateNhanVien";
import { Button } from "../ui/button";
import Link from "next/link";
export const columns: ColumnDef<PhieuSua>[] = [
  {
    accessorKey: "idPhieuSua",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Phiếu Sửa" />
    ),
  },
  {
    accessorKey: "khachHang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách Hàng" />
    ),
    filterFn: (row, columnId, value) => {
      const khachHang = row.getValue(columnId) as KhachHang;
      console.log(
        khachHang?.tenKhachHang?.toLowerCase().includes(value.toLowerCase())
      );
      return khachHang?.tenKhachHang
        ?.toLowerCase()
        .includes(value.toLowerCase());
    },
    cell: (info) => (info.getValue() as KhachHang)?.tenKhachHang,
  },
  {
    accessorKey: "tenSanPham",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên Sản Phẩm" />
    ),
    filterFn: "includesString",

  },
  {
    accessorKey: "nhanVien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhân Viên" />
    ),
    filterFn: (row, columnId, value) => {
      const khachHang = row.getValue(columnId) as NhanVien;
      console.log(
        khachHang?.hoTen?.toLowerCase().includes(value.toLowerCase())
      );
      return khachHang?.hoTen
        ?.toLowerCase()
        .includes(value.toLowerCase());
    },
    cell: (info) => (info.getValue() as NhanVien)?.hoTen,
  },
  {
    accessorKey: "moTa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mô Tả" />
    ),
    filterFn: "includesString",

  },
  {
    accessorKey: "loaiSuaChua",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại Sửa Chữa" />
    ),
    filterFn: "includesString",

  },
  {
    accessorKey: "baoGia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Báo Giá" />
    ),
    filterFn: "includesString",

  },
  {
    accessorKey: "ngayTao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày Tạo" />
    ),
    cell: (info) => new Date(info.getValue() as Date).toLocaleDateString(),
    filterFn: "includesString",

  },
  {
    accessorKey: "giaLinhKien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá linh kiện" />
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "tongGia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tổng Giá" />
    ),
    cell: ({ row }) => {
      const baoGia = (row.getValue("baoGia") as number) || 0;
      const giaLinhKien = (row.getValue("giaLinhKien") as number) || 0;
      const loaiSuaChua = (row.getValue("loaiSuaChua") as String) || "Sửa chữa";
      const tongGia = baoGia + giaLinhKien;
      if (loaiSuaChua==="Bảo hành"){
        return "0 đ"
      }
      return tongGia.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const phieusua = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/phieusua/${phieusua.idPhieuSua}`}>Chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
