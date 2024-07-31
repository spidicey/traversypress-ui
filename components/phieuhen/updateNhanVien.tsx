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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSWR from "swr";
import { number } from "zod";
import { fetcher } from "../utils/fetcher";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useState } from "react";
import { revalidatePath } from "next/cache";
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
interface IDPhieuHen {
  idPhieuHen: number;
}
interface PhieuHenFormData {
  ngayHen: Date;
  idKhachHang: number;
  idNhanVien: number;
  trangThai: string;
  idCategory: number;
}

export function UpdatePhieuHen({ idPhieuHen: idPhieuHen }: IDPhieuHen) {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue } =
    useForm<PhieuHenFormData>();
  const {
    data: phieuHendata,
    isLoading,
    error,
  } = useSWR<ResponseData<PhieuHen>>(
    `http://localhost:8080/api/phieuhen/${idPhieuHen}`,
    fetcher
  );
  const { data: nhanVienData } = useSWR<ResponseData<NhanVien[]>>(
    `http://localhost:8080/api/auth/nhanvien`,
    fetcher
  );
  if (isLoading) return <div>Loading</div>;

  const onSubmit = async (formData: PhieuHenFormData) => {
    console.log(formData);
    const updatedData = {
      ngayHen: phieuHendata?.data.ngayHen,
      idKhachHang: phieuHendata?.data.khachHang.idKhachHang,
      idNhanVien: formData.idNhanVien,
      trangThai: formData.trangThai,
      idCategory: phieuHendata?.data.category.idLoai,
    };
    console.log(updatedData);
    const response = await fetch(
      `http://localhost:8080/api/phieuhen/${idPhieuHen}`,
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
        description: "Thông tin phiếu hẹn đã được cập nhật thành công.",
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
          <DialogTitle>Chỉnh sửa</DialogTitle>
          <DialogDescription>
            Chỉnh sửa tại đây. Bấm lưu để lưu lại.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nhanVien" className="text-right">
                Nhân viên
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("idNhanVien", parseInt(value))
                }
                defaultValue={nhanVienData?.data.at(0)?.hoTen}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent className="col-span-3">
                  <SelectGroup>
                    <SelectLabel>Nhân viên</SelectLabel>
                    {nhanVienData?.data.map((nv: NhanVien) => (
                      <SelectItem
                        key={nv.idNhanVien}
                        value={nv.idNhanVien.toString()}
                      >
                        {nv.hoTen}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trangThai" className="text-right">
                Trạng thái
              </Label>
              <Select
                onValueChange={(value) => setValue("trangThai", value)}
                // defaultValue="Đang chờ"
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent className="col-span-3">
                  <SelectGroup>
                    <SelectLabel>Trạng thái</SelectLabel>
                    <SelectItem value="Đang chờ">Đang chờ</SelectItem>
                    <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                    <SelectItem value="Đã huỷ">Đã huỷ</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
