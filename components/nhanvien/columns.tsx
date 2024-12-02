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
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

export const columns: ColumnDef<NhanVien>[] = [
  {
    accessorKey: "idNhanVien",
    // header: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "hoTen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Họ Tên" />
    ),
  },
  {
    accessorKey: "sdt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số điện thoại" />
    ),
  },
  {
    accessorKey: "chucVu",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chức Vụ" />
    ),
  },
  {
    accessorKey: "diaChi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Địa Chỉ" />
    ),
  },
  {
    accessorKey: "taiKhoan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tài Khoản" />
    ),
    filterFn: (row, columnId, value) => {
      const nhanVien = row.getValue(columnId) as Account;
      console.log(nhanVien?.tk?.toLowerCase().includes(value.toLowerCase()));
      return nhanVien?.tk?.toLowerCase().includes(value.toLowerCase());
    },
    cell: (info) => {
      const account: Account = info.getValue() as Account;
      return (
        <div style={{ color: account.active ? "green" : "red" }}>
          {account.tk}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const nhanvien = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(nhanvien.sdt)}
            >
              Copy sdt
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
