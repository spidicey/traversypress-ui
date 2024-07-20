"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-columns-header";

export const columns: ColumnDef<PhieuHen>[] = [
  {
    accessorKey: "idPhieuHen",
    // header: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "ngayHen",
    header: "Ngày Hẹn",
  },
  {
    accessorKey: "khachHang",
    header: "Khách hàng",
    cell: (info) => (info.getValue() as KhachHang)?.tenKhachHang,
    filterFn: (row, columnIds, filterValue) =>
      (row.getValue(columnIds) as KhachHang)?.tenKhachHang
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
  },
  {
    accessorKey: "nhanVien",
    header: "Nhân viên",
    cell: (info) => (info.getValue() as NhanVien)?.hoTen,
    filterFn: (row, columnIds, filterValue) =>
      (row.getValue(columnIds) as NhanVien)?.hoTen
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
  },
  {
    accessorKey: "trangThai",
    header: "Trạng thái",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "category.loai",
    header: "Loại",
  },
];
