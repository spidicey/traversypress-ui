"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/data-table-columns-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { UpdatePhieuHen } from "./updateNhanVien";

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày Hẹn" />
    ),
  },
  {
    accessorKey: "khachHang",
    header: "Khách hàng",
    cell: (info) => (info.getValue() as KhachHang)?.tenKhachHang,
    filterFn: (row, columnId, value) => {
      const khachHang = row.getValue(columnId) as KhachHang;
      console.log(
        khachHang?.tenKhachHang?.toLowerCase().includes(value.toLowerCase())
      );  
      return khachHang?.tenKhachHang?.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "nhanVien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhân viên" />
    ),
    cell: (info) => (info.getValue() as NhanVien)?.hoTen,
    filterFn: (row, columnId, value) => {
      const nhanVien = row.getValue(columnId) as NhanVien;
      console.log(nhanVien?.hoTen?.toLowerCase().includes(value.toLowerCase()));
      return nhanVien?.hoTen?.toLowerCase().includes(value.toLowerCase());
    },
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const phieuhen = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => (
  //               <UpdatePhieuHen idPhieuHen={phieuhen.idPhieuHen} />
  //             )}
  //           >
  //             Điều chuyển
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
    cell: (info) => (
      <UpdatePhieuHen idPhieuHen={info.row.original.idPhieuHen} />
    ),
  },
];
