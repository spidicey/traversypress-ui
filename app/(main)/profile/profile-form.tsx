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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { JSX, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "@/components/ui/use-toast";

const profileFormSchema = z.object({
  hoTen: z.string(),
  sdt: z.string(),
  diaChi: z.string(),
  chucVu: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const [username, setUsername] = useState<string | null>(null);
  const [nhanVienData, setNhanVienData] = useState<ResponseData<NhanVien>>();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode<{ username: string }>(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      hoTen: "",
      sdt: "",
      diaChi: "",
      chucVu: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (!username) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/nhanvien/username/${username}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNhanVienData(data);
        form.setValue("hoTen", data?.data?.hoTen || "");
        form.setValue("sdt", data?.data?.sdt || "");
        form.setValue("diaChi", data?.data?.diaChi || "");
        form.setValue("chucVu", data?.data?.chucVu || "");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [username, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!nhanVienData) return;

    const token = Cookies.get("token");
    const updatedData = {
      ...data,
      idNhanVien: nhanVienData.data.idNhanVien,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/nhanvien`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: ``,
        },
        body: JSON.stringify(updatedData),
      }
    );

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

  if (!username) {
    return <div>Đang tải...</div>;
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
