"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const profileFormSchema = z.object({
  hoTen: z.string(),
  sdt: z.string(),
  diaChi: z.string(),
  chucVu: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const token = Cookies.get("token");
  const decodedToken = token ? jwtDecode(token) : null;
    // @ts-ignore
  const username = decodedToken.username
  
  const [nhanVienData, setNhanVienData] = useState<ResponseData<NhanVien>>();

  useEffect(() => {
    fetch(`http://localhost:8080/api/auth/nhanvien/username/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setNhanVienData(data);
        form.setValue("hoTen", data.hoTen);
        form.setValue("sdt", data.sdt);
        form.setValue("diaChi", data.diaChi);
        form.setValue("chucVu", data.chucVu);
        console.log(data);
      });
  }, [username]);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      hoTen: nhanVienData?.data?.hoTen || "",
      sdt: nhanVienData?.data?.sdt || "",
      diaChi: nhanVienData?.data?.diaChi || "",
      chucVu: nhanVienData?.data?.chucVu || "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    const updatedData = {
      ...data,
       idNhanVien: nhanVienData?.data.idNhanVien || "",
    };
    console.log(updatedData);
    const response = await fetch(`http://localhost:8080/api/auth/nhanvien`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      toast({
        title: "Cập nhật thành công",
        action: <ToastAction altText="Lưu thành công">Đóng</ToastAction>,
      });
    } else {
      const errorData = await response.json();
      toast({
        title: "Cập nhật thất bại",
        description: errorData.message,
        action: <ToastAction altText="Lưu thất bại">Đóng</ToastAction>,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="hoTen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ Tên</FormLabel>
              <FormControl>
                <Input placeholder="Họ Tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sdt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số Điện Thoại</FormLabel>
              <FormControl>
                <Input placeholder="Số Điện Thoại" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diaChi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa Chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Địa Chỉ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="chucVu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chức Vụ</FormLabel>
              <FormControl>
                <Input placeholder="Chức Vụ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
