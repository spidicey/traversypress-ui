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
import { ToastAction } from "@radix-ui/react-toast";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import storage from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
export function AddLinhKien() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, setValue } = useForm<LinhKien>();
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
  const onSubmit = async (formData: LinhKien) => {
    console.log(file);
    const urls = [];
    if (file) {
      for (let i = 0; i < file.length; i++) {
        const image = file[i];
        const imageRef = ref(storage, `images/linhkien/${image.name}`); // Create a reference to the file in storage
        await uploadBytes(imageRef, image); // Upload the file to the reference
        const url = await getDownloadURL(imageRef); // Get the download URL
        urls.push(url);
      }
    }
    console.log(urls);
    const createData = {
      tenSanPham: formData.tenSanPham,
      nhanHieu: formData.nhanHieu,
      gia: formData.gia,
      thoiGianBaoHanh: formData.thoiGianBaoHanh,
      anhs: urls,
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
          {/* <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
            <FileIcon className="w-12 h-12" />
            <span className="text-sm font-medium text-gray-500">
              Drag and drop a file or click to browse
            </span>
            <span className="text-xs text-gray-500">
              PDF, image, video, or audio
            </span>
          </div> */}

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
