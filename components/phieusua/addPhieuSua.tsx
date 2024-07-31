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
import { string } from "zod";
import MultipleSelector, {
  MultipleSelectorRef,
  Option,
} from "../ui/mutiple-selector";
import React from "react";

export function AddPhieuSua() {
  const { toast } = useToast();
  const ref = React.useRef<MultipleSelectorRef>(null);
  const { register, handleSubmit, reset, setValue } = useForm<PhieuSua>();
  const { data: nhanVienData } = useSWR<ResponseData<NhanVien[]>>(
    `http://localhost:8080/api/auth/nhanvien`,
    fetcher
  );
  const { data: khachHangData } = useSWR<ResponseData<KhachHang[]>>(
    `http://localhost:8080/api/auth/khachhang`,
    fetcher
  );
  const {
    data: linhKienData,
    isLoading,
    error,
  } = useSWR<ResponseData<LinhKien[]>>(
    `http://localhost:8080/api/kho/linhkien`,
    fetcher
  );
  const OPTIONS: Option[] =
    linhKienData?.data.map((item: LinhKien) => ({
      label: item.tenSanPham,
      value: item.idSanPham.toString(),
    })) || [];

  const onSubmit = async (formData: PhieuSua) => {
    console.log(JSON.stringify(ref.current?.selectedValue, null, 2));
    const selectedValueArray: Option[] = Object.values(
      JSON.parse(JSON.stringify(ref.current?.selectedValue))
    );
    const idArray: number[] = selectedValueArray.map((option: Option) =>
      parseInt(option.value, 10)
    );
    const createData = {
      idKhachHang: formData.khachHang.idKhachHang,
      tenSanPham: formData.tenSanPham,
      moTa: formData.moTa,
      loaiSuaChua: formData.loaiSuaChua,
      baoGia: formData.baoGia,
      ngayTao: new Date(),
      idNhanVien: formData.nhanVien.idNhanVien,
      idLinhKiens: idArray,
    };
    console.log(createData);
    const response = await fetch(`http://localhost:8080/api/phieusua`, {
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
              <Label htmlFor="tenSanPham" className="text-right">
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
              <Label htmlFor="moTa" className="text-right">
                Mô tả
              </Label>
              <Input
                id="moTa"
                type="text"
                {...register("moTa", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="baoGia" className="text-right">
                Báo giá
              </Label>
              <Input
                id="baoGia"
                type="number"
                {...register("baoGia", { required: true })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nhanVien" className="text-right">
                Loại sửa chữa
              </Label>
              <Select
                onValueChange={(value) => setValue("loaiSuaChua", value)}
                defaultValue={nhanVienData?.data.at(0)?.hoTen}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Loại sửa chữa" />
                </SelectTrigger>
                <SelectContent className="col-span-3">
                  <SelectGroup>
                    <SelectLabel>Loại sửa chữa</SelectLabel>
                    <SelectItem key={"bh"} value={"Bảo hành"}>
                      Bảo hành
                    </SelectItem>
                    <SelectItem key={"sc"} value={"Sửa chữa"}>
                      Sửa chữa
                    </SelectItem>
                    <SelectItem key={"dv"} value={"Dịch vụ"}>
                      Dịch vụ
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nhanVien" className="text-right">
                Nhân viên
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("nhanVien.idNhanVien", parseInt(value))
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
              <Label htmlFor="khachhang" className="text-right">
                Khách hàng
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("khachHang.idKhachHang", parseInt(value))
                }
                defaultValue={nhanVienData?.data.at(0)?.hoTen}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent className="col-span-3">
                  <SelectGroup>
                    <SelectLabel>Nhân viên</SelectLabel>
                    {khachHangData?.data.map((kh: KhachHang) => (
                      <SelectItem
                        key={kh.idKhachHang}
                        value={kh.idKhachHang.toString()}
                      >
                        {kh.tenKhachHang}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="baoGia" className="text-right">
                Linh kiện
              </Label>
              <MultipleSelector
                defaultOptions={OPTIONS}
                placeholder="Chọn linh kiện"
                ref={ref}
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
                className="flex flex-col width-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              // onClick={() => {
              //   toast({
              //     title: "Your ref data",
              //     description: (
              //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              //         <code className="text-white">
              //           {JSON.stringify(ref.current?.selectedValue, null, 2)}
              //         </code>
              //       </pre>
              //     ),
              //   });
              // }}
              type="submit"
            >
              Lưu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
