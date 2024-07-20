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

export const columns: ColumnDef<KhachHang>[] = [
  {
    accessorKey: "idKhachHang",
    // header: "ID",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "tenKhachHang",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Họ Tên" />
    ),
  },
  {
    accessorKey: "dienThoai",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số điện thoại" />
    ),
  },

  {
    accessorKey: "diaChi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Địa Chỉ" />
    ),
  },
  {
    accessorKey: "maSoThue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã Số Thuế" />
    ),
  },
  {
    accessorKey: "taiKhoan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tài Khoản" />
    ),
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
      const khachhang = row.original;

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
              onClick={() => navigator.clipboard.writeText(khachhang.maSoThue)}
            >
              Copy mã số thuế
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
