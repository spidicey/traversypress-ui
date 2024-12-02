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
import Image from "next/image";
export const columns: ColumnDef<LinhKien>[] = [
  {
    accessorKey: "danhSachAnh",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh" />
    ),
    cell: (info) =>{
      const linhKien = info.getValue() as Anh[]
      if (linhKien.length !== 0) {
      return <Image src={linhKien[0].url} alt="ảnh" width={100} height={100} />

      }
    }
  },
  {
    accessorKey: "idSanPham",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Linh Kiện" />
    ),
  },
  {
    accessorKey: "tenSanPham",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên Linh Kiện" />
    ),
  },
  {
    accessorKey: "nhanHieu",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhãn hiệu" />
    ),
  },

  {
    accessorKey: "gia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá" />
    ),
  },
  {
    accessorKey: "thoiGianBaoHanh",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian bảo hành" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const linhKien = row.original;

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
              onClick={() => navigator.clipboard.writeText(linhKien.nhanHieu)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
