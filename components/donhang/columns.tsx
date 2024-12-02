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
import { UpdateDonHang } from "./updateDonHang";
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
export const columns: ColumnDef<DonHang>[] = [
  {
    accessorKey: "idDonHang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID đơn hàng" />
    ),
    filterFn: (rows:any, id, filterValue) => {
      return rows.getValue(id).toString().includes(filterValue);
    }
  },
  {
    accessorKey: "idKhachHang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Khách Hàng" />
    ),
    filterFn: (rows:any, id, filterValue) => {
      return rows.getValue(id).toString().includes(filterValue);
    }
    // cell: (info) => (info.getValue() as KhachHang)?.tenKhachHang,
  },
  {
    accessorKey: "tongTien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tổng tiền" />
    ),
    filterFn: (rows:any, id, filterValue) => {
      return rows.getValue(id).toString().includes(filterValue);
    }
  },
  {
    accessorKey: "ngayDat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày đặt" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("ngayDat"));
      return formatDate(date);
    },
  },
  {
    accessorKey: "diaChi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Địa chỉ" />
    ),
    
  },
  {
    accessorKey: "trangThai",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    filterFn: (rows:any, id, filterValue) => {
      return rows.getValue(id).toString().includes(filterValue);
    }
  },
  {
    accessorKey: "sdt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số điện thoại" />
    ),
    filterFn: (rows:any, id, filterValue) => {
      return rows.getValue(id).toString().includes(filterValue);
    }
  },
  {
    accessorKey: "thanhToan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thanh toán" />
    ),
    filterFn: (rows:any, id, filterValue) => {
      return rows.getValue(id).toString().includes(filterValue);
    }
    // cell: (info) => new Date(info.getValue() as Date).toLocaleDateString(),
  },
  {
    accessorKey: "view",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="View" />
    ),
    cell: (info) => (
      <UpdateDonHang idDonHang={info.row.original.idKhachHang} />
    ),
    filterFn: (rows:any, id, filterValue) => {
      return rows.getValue(id).toString().includes(filterValue);
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const donhang = row.original;

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
              <Link href={`/donhang/${donhang.idDonHang}`}>Chi tiết</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
