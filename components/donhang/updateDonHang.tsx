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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useState } from "react";

interface IDDonHang {
  idDonHang: number;
}

export function UpdateDonHang({ idDonHang }: IDDonHang) {
  const { toast } = useToast();
  const [trangThai, setTrangThai] = useState<string>("");
  const { data, isLoading, error } = useSWR<ResponseData<DonHang>>(
    `http://localhost:8080/api/thanh-toan/don-hang/${idDonHang}`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data || data.status !== 200)
    return <div>Error loading order details.</div>;

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const updatedData = {
      idDonHang,
      trangThai,
    };
    console.log(updatedData);

    const response = await fetch(
      `http://localhost:8080/api/thanh-toan/don-hang/${idDonHang}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      toast({
        title: "Cập nhật thành công",
        description: "Trạng thái đơn hàng đã được cập nhật thành công.",
        action: <ToastAction altText="Close">Đóng</ToastAction>,
      });
    } else {
      toast({
        title: "Cập nhật thất bại",
        description: "Đã xảy ra lỗi trong quá trình cập nhật.",
        action: <ToastAction altText="Close">Đóng</ToastAction>,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cập nhật trạng thái</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật trạng thái</DialogTitle>
          <DialogDescription>
            Chọn trạng thái mới cho đơn hàng. Bấm lưu để cập nhật.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="trangThai" className="text-right">
                Trạng thái
              </label>
              <Select
                onValueChange={(value) => setTrangThai(value)}
                defaultValue={data?.data?.trangThai}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
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
