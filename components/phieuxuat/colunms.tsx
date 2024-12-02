"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-columns-header";
import { UpdatePhieuXuat } from "../phieuxuat/updatePhieuXuat";
export const columns: ColumnDef<PhieuXuat>[] = [
  {
    accessorKey: "idPhieuXuat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },

  {
    accessorKey: "linhKien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),

    cell: (info) => (info.getValue() as LinhKien)?.tenSanPham,
  },
  {
    accessorKey: "soLuong",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
    ),
  },
  {
    accessorKey: "nhanVien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhân viên" />
    ),
    filterFn: (row, columnId, value) => {
      const nhanVien = row.getValue(columnId) as NhanVien;
      console.log(nhanVien?.hoTen?.toLowerCase().includes(value.toLowerCase()));
      return nhanVien?.hoTen?.toLowerCase().includes(value.toLowerCase());
    },
    cell: (info) => (info.getValue() as NhanVien)?.hoTen,
  },
  {
    accessorKey: "ngayCap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày Cấp" />
    ),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
    cell: (info) => (
      <UpdatePhieuXuat idPhieuXuat={info.row.original.idPhieuXuat} />
    ),
  },
];
