"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Input } from "../ui/input";

interface IDLinhKien {
  idLinhKien: number;
}

interface LinhKienFormData {
  tenLinhKien: string;
  loaiLinhKien: string;
  soLuong: number;
  trangThai: string;
}

export function UpdateLinhKien({ idLinhKien }: IDLinhKien) {
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<FileList | null>(null);
  function getImageData(event: ChangeEvent<HTMLInputElement>) {
    // FileList is immutable, so we need to create a new one
    const dataTransfer = new DataTransfer();

    // Add newly uploaded images
    Array.from(event.target.files!).forEach((image) =>
      dataTransfer.items.add(image)
    );

    const files = dataTransfer.files;
    const displayUrl = URL.createObjectURL(event.target.files![0]);

    return { files, displayUrl };
  }
  const { toast } = useToast();
  const { register, handleSubmit, setValue } = useForm<LinhKienFormData>();

  const { data: linhKienData, isLoading } = useSWR<ResponseData<LinhKien>>(
    `http://localhost:8080/api/linhkien/${idLinhKien}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;

  const onSubmit = async (formData: LinhKienFormData) => {
    const updatedData = {
      ...formData,
      idLinhKien,
    };

    const response = await fetch(
      `http://localhost:8080/api/linhkien/${idLinhKien}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin linh kiện đã được cập nhật thành công.",
        action: <ToastAction altText="Lưu thành công">Đóng</ToastAction>,
      });
    } else {
      toast({
        title: "Cập nhật thất bại",
        description: "Đã xảy ra lỗi trong quá trình cập nhật.",
        action: <ToastAction altText="Lưu thất bại">Đóng</ToastAction>,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Chỉnh sửa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa Linh Kiện</DialogTitle>
          <DialogDescription>
            Chỉnh sửa thông tin linh kiện tại đây. Bấm lưu để lưu lại.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 text-sm">
            <Image
              // loader={imageLoader}
              src={preview}
              alt="Picture of the author"
              width={150}
              height={150}
            />
            <Label htmlFor="file" className="text-sm font-medium">
              File
            </Label>
            <Input
              id="file"
              type="file"
              placeholder="File"
              accept="image/*"
              multiple
              onChange={(event) => {
                const { files, displayUrl } = getImageData(event);
                setFile(files);
                setPreview(displayUrl);
              }}
            />
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenLinhKien" className="text-right">
                Tên Linh Kiện
              </Label>
              <input
                className="col-span-3 input"
                {...register("tenLinhKien")}
                defaultValue={linhKienData?.data?.tenSanPham}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loaiLinhKien" className="text-right">
                Loại Linh Kiện
              </Label>
              <input
                className="col-span-3 input"
                {...register("loaiLinhKien")}
                defaultValue={linhKienData?.data?.nhanHieu}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="soLuong" className="text-right">
                Số Lượng
              </Label>
              <input
                className="col-span-3 input"
                type="number"
                {...register("soLuong")}
                defaultValue={linhKienData?.data?.gia}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
