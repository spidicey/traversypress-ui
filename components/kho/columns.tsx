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

export const columns: ColumnDef<Kho>[] = [
  {
    accessorKey: "linhKien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên Linh Kiện" />
    ),
    cell: (info) => (info.getValue() as LinhKien)?.tenSanPham,
    filterFn: (row, columnIds, filterValue) =>
      (row.getValue(columnIds) as LinhKien)?.tenSanPham
        .toLowerCase()
        .includes(filterValue.toLowerCase()),

  },
  {
    id:"nhãn hiệu",
    accessorKey: "linhKien",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhãn Hiệu" />
    ),
    cell: (info) => (info.getValue() as LinhKien)?.nhanHieu,
    filterFn: (row, columnIds, filterValue) =>
      (row.getValue(columnIds) as LinhKien)?.nhanHieu
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
  },
  {
    accessorKey: "soLuong",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
    ),
        filterFn: "includesString",

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
              onClick={() =>
                navigator.clipboard.writeText(linhKien.linKien.nhanHieu)
              }
            >
              Copy ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
