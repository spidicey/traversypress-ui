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
interface NhanVienFormData {
  username: string;
  password: string;
  email: string;
  cccd: string;
  hoTen: string;
  sdt: string;
  diaChi: string;
  chucVu: string;
}
export function AddNhanVien() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue } =
    useForm<NhanVienFormData>();

  const onSubmit = async (formData: NhanVienFormData) => {
    const createData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      cccd: formData.cccd,
      hoTen: formData.hoTen,
      sdt: formData.sdt,
      diaChi: formData.diaChi,
      chucVu: formData.chucVu,
    };
    const response = await fetch(`http://localhost:8080/api/auth/nhanvien`, {
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
        description: "Thông nhân viên thành công.",
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
            {/* Add new fields below */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                {...register("username", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cccd" className="text-right">
                CCCD
              </Label>
              <Input
                id="cccd"
                type="text"
                {...register("cccd", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hoTen" className="text-right">
                Họ Tên
              </Label>
              <Input
                id="hoTen"
                type="text"
                {...register("hoTen", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sdt" className="text-right">
                SĐT
              </Label>
              <Input
                id="sdt"
                type="tel"
                {...register("sdt", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="diaChi" className="text-right">
                Địa Chỉ
              </Label>
              <Input
                id="diaChi"
                type="text"
                {...register("diaChi", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="chucVu" className="text-right">
                Chức Vụ
              </Label>
              <Input
                id="chucVu"
                type="text"
                {...register("chucVu", { required: true })}
                className="col-span-3"
              />
            </div>
            {/* Continue with the rest of your form */}
          </div>
          <DialogFooter>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
