"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-columns-header";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
export const columns: ColumnDef<CtDonHang>[] = [
  {
    accessorKey: "idDonHang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Đơn hàng" />
    ),
  },
  // {
  //   accessorKey: "linhKien.tenSanPham",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Tên sản phẩm" />
  //   ),
  //   // cell: (info) => (info.getValue() as CTPhieuSua)?.linhKien.tenSanPham,
  // },
  // {
  //   accessorKey: "linhKien.nhanHieu",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Nhãn hiệu" />
  //   ),
  //   // cell: (info) => (info.getValue() as CTPhieuSua)?.linhKien.nhanHieu,
  // },
  {
    accessorKey: "idSanPham",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="id Sản phẩm" />
    ),
  },
  {
    accessorKey: "soLuong",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
    ),
  },
  {
    accessorKey: "gia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="giá" />
    ),
  },
];
