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
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddLinhKien() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm<LinhKien>();
  const onSubmit = async (formData: LinhKien) => {
    const createData = {
      tenSanPham: formData.tenSanPham,
      nhanHieu: formData.nhanHieu,
      gia: formData.gia,
      thoiGianBaoHanh: formData.thoiGianBaoHanh,
    };
    const response = await fetch(`http://localhost:8080/api/kho/linhkien`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "",
      },
      body: JSON.stringify(createData),
    });
    if (response.ok) {
      toast({
        title: "Thêm thành công",
        description: "Linh kiện đã được thêm thành công.",
        action: <ToastAction altText="Lưu thành công">Đóng</ToastAction>,
      });
    } else {
      toast({
        title: "Thêm thất bại",
        description: "Đã xảy ra lỗi trong quá trình thêm.",
        action: <ToastAction altText="Lưu thất bại">Đóng</ToastAction>,
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Thêm</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm</DialogTitle>
          <DialogDescription>
            Thêm tại đây. Bấm lưu để lưu lại.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="soLuong" className="text-right">
                Tên sản phẩm
              </Label>
              <Input
                id="tenSanPham"
                type="text"
                {...register("tenSanPham", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ngayCap" className="text-right">
                Nhãn hiệu
              </Label>
              <Input
                id="nhanHieu"
                type="text"
                {...register("nhanHieu", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ghiChu" className="text-right">
                Giá
              </Label>
              <Input
                id="gia"
                type="number"
                {...register("gia", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ghiChu" className="text-right">
                Thời gian bảo hành (tháng)
              </Label>
              <Input
                id="thoiGianBaoHanh"
                type="number"
                {...register("thoiGianBaoHanh", { required: true })}
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
