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

export function AddPhieuXuat() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm<PhieuXuat>();
  const { data: nhanVienData } = useSWR<ResponseData<NhanVien[]>>(
    `http://localhost:8080/api/auth/nhanvien`,
    fetcher
  );
  const { data: linhKienData } = useSWR<ResponseData<LinhKien[]>>(
    `http://localhost:8080/api/kho/linhkien`,
    fetcher
  );
  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${dd}-${mm}`;
  };
  const onSubmit = async (formData: PhieuXuat) => {
    const formattedDate = formatDate(new Date(formData.ngayCap));
    const createData = {
      soLuong: formData.soLuong,
      ngayCap: formattedDate,
      ghiChu: formData.ghiChu,
      idNhanVien: formData.nhanVien.idNhanVien || 0,
      idSanPham: formData.linhKien.idSanPham || 0,
    };
    const response = await fetch(`http://localhost:8080/api/kho/phieuxuat`, {
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
        description: "Thông tin phiếu xuất đã được thêm thành công.",
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
                Số lượng
              </Label>
              <Input
                id="soLuong"
                type="number"
                {...register("soLuong", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ngayCap" className="text-right">
                Ngày cấp
              </Label>
              <Input
                id="ngayCap"
                type="date"
                {...register("ngayCap", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ghiChu" className="text-right">
                Ghi chú
              </Label>
              <Input
                id="ghiChu"
                {...register("ghiChu", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nhanVien" className="text-right">
                Nhân viên
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("nhanVien.idNhanVien", parseInt(value))
                }
                defaultValue={nhanVienData?.data?.at(0)?.hoTen}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent className="col-span-3">
                  <SelectGroup>
                    <SelectLabel>Nhân viên</SelectLabel>
                    {nhanVienData?.data?.map((nv: NhanVien) => (
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
              <Label htmlFor="sanPham" className="text-right">
                Sản phẩm
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("linhKien.idSanPham", parseInt(value))
                }
                defaultValue={linhKienData?.data.at(0)?.tenSanPham}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn sản phẩm" />
                </SelectTrigger>
                <SelectContent className="col-span-3">
                  <SelectGroup>
                    <SelectLabel>Sản phẩm</SelectLabel>
                    {linhKienData?.data?.map((lk) => (
                      <SelectItem
                        key={lk.idSanPham}
                        value={lk.idSanPham.toString()}
                      >
                        {lk.tenSanPham}
                      </SelectItem>
                    ))}
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
