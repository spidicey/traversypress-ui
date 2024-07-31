"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-columns-header";
import { UpdatePhieuXuat } from "../phieuxuat/updatePhieuXuat";
export const columns: ColumnDef<PhieuNhap>[] = [
  {
    accessorKey: "idPhieuNhap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "ngayNhap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày Nhập" />
    ),
  },
  {
    accessorKey: "nhaCungCap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhà cung cấp" />
    ),
  },
  {
    accessorKey: "nhanVien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhân viên" />
    ),
    cell: (info) => (info.getValue() as NhanVien)?.hoTen,
  },
  {
    accessorKey: "soLuong",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
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
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
    cell:(info) => <UpdatePhieuXuat idPhieuXuat={info.row.original.idPhieuNhap} />,
  },
];