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

interface IDPhieuXuat {
  idPhieuXuat: number;
}

export function UpdatePhieuXuat({ idPhieuXuat }: IDPhieuXuat) {
  const { toast } = useToast();
  const [soLuong, setSoLuong] = useState<number>(0);
  const [ghiChu, setGhiChu] = useState<string>("");
  const { data, isLoading, error } = useSWR<ResponseData<PhieuXuat>>(
    `http://localhost:8080/api/kho/phieuxuat/${idPhieuXuat}`,
    fetcher
  );
  if (isLoading) return <div>Loading</div>;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const updatedData = {
      idPhieuXuat,
      idNhanVien: data?.data.nhanVien.idNhanVien,
      idSanPham: data?.data.linhKien.idSanPham,
      ngayCap: data?.data.ngayCap,
      soLuong,
      ghiChu,
    };
    console.log(updatedData);
    const response = await fetch(`http://localhost:8080/api/kho/phieunhap`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "",
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin phiếu xuất đã được cập nhật thành công.",
        action: <ToastAction altText="Lưu thành công">Đóng</ToastAction>,
      });
    } else {
      toast({
        title: "Cập nhật thất bại",
        description: "Đã xảy ra lỗi trong quá trình cập nhật.",
        action: <ToastAction altText="Lưu thất bại">Đóng</ToastAction>,
      });
    }
  }
  console.log(data?.data.ngayCap);
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
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Số lượng
              </Label>
              <Input
                id="quantity"
                value={soLuong}
                className="col-span-3"
                onChange={(e) => setSoLuong(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Ghi chú
              </Label>
              <Input
                id="quantity"
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                className="col-span-3"
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
