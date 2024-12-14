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
import { UpdateLinhKien } from "./updateLinhKien";
const deleteLinhKien = async (id: any) => {
  try {
    const response = await fetch(`http://localhost:8080/api/linhkien/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
    alert("Xoá Linh Kiện Thành công!");
  } catch (error) {
    console.error(error);
    alert("Xoá Linh Kiện Thất Bại!");
  }
};

export const columns: ColumnDef<LinhKien>[] = [
  {
    accessorKey: "danhSachAnh",
    id: "Ảnh",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh" />
    ),
    cell: (info) => {
      const linhKien = info.getValue() as Anh[];
      if (linhKien.length !== 0) {
        return (
          <Image src={linhKien[0].url} alt="ảnh" width={100} height={100} />
        );
      }
    },
  },
  {
    accessorKey: "idSanPham",
    id: "ID Linh Kiện",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID Linh Kiện" />
    ),
    filterFn: "includesString",
  },
  {
    id: "Tên Linh Kiện",
    accessorKey: "tenSanPham",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên Linh Kiện" />
    ),
    filterFn: "includesString",
  },
  {
    id: "Nhãn hiệu",
    accessorKey: "nhanHieu",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nhãn hiệu" />
    ),
    filterFn: "includesString",
  },

  {
    id: "Giá",
    accessorKey: "gia",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá" />
    ),
    filterFn: "includesString",
  },
  {
    id: "Thời gian bảo hành",
    accessorKey: "thoiGianBaoHanh",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian bảo hành" />
    ),
    filterFn: "includesString",
  },
  // {
  //   id: "edit",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="View" />
  //   ),
  //   cell: (info) => <UpdateLinhKien idLinhKien={info.row.original.idSanPham} />,
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const linhKien = row.original;

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
  //             onClick={() => deleteLinhKien(linhKien.idSanPham)}
  //           >
  //             <Button variant="destructive">Xoá</Button>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
