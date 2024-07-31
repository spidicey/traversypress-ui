"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
// import { DialogDemo } from "../dialogdemo";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import Link from "next/link";
import { Icons } from "../icons";

interface UserSignUpProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignUpForm({ className, ...props }: UserSignUpProps) {
  const Context = React.createContext({ name: "Default" });
  const router = useRouter();
  const { toast } = useToast();
  const UserSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    email: z.string().email("Invalid email address"),
    tenKhachHang: z.string().min(1, "Customer name is required"),
    diaChi: z.string().min(1, "Address is required"),
    dienThoai: z
      .string()
      .min(10, "Phone number must be at least 10 digits long"),
    maSoThue: z
      .string()
      .min(10, "Tax ID must be at least 10 digits long")
      .optional(),
  });
  type TAdminSchema = z.infer<typeof UserSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TAdminSchema>({
    resolver: zodResolver(UserSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: TAdminSchema) {
    setIsLoading(true);
    console.log(data);
    const response = await fetch("http://localhost:8080/api/auth/khachhang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast({
        title: "Đăng ký thành công ",
        description:
          "Bạn đã đăng ký tài khoản thành công vui lòng đăng nhập để sử dụng dịch vụ",
        action: (
          <ToastAction altText="Đến trang đăng nhập">
            <Link href="/login">Đăng nhập</Link>
          </ToastAction>
        ),
      });
    }
    setIsLoading(false);
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only">Username or Email</Label>
            <Input
              id="name"
              type="input"
              autoCapitalize="none"
              placeholder="Username"
              autoCorrect="off"
              disabled={isLoading}
              {...register("username")}
            />
            {errors?.username && (
              <p className="px-1 text-xs text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only">Password</Label>
            <Input
              id="password"
              type="password"
              autoCapitalize="none"
              placeholder="Password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Họ Tên"
              disabled={isLoading}
              {...register("tenKhachHang")}
            />
            {errors?.tenKhachHang && (
              <p className="px-1 text-xs text-red-600">
                {errors.tenKhachHang.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only">Full Name</Label>
            <Input
              id="address"
              type="text"
              placeholder="Địa chỉ"
              disabled={isLoading}
              {...register("diaChi")}
            />
            {errors?.diaChi && (
              <p className="px-1 text-xs text-red-600">
                {errors.diaChi.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Số điện thoại"
              disabled={isLoading}
              {...register("dienThoai")}
            />
            {errors?.dienThoai && (
              <p className="px-1 text-xs text-red-600">
                {errors.dienThoai.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only">Full Name</Label>
            <Input
              id="taxnumber"
              type="text"
              placeholder="Mã số thuế"
              disabled={isLoading}
              {...register("maSoThue")}
            />
            {errors?.maSoThue && (
              <p className="px-1 text-xs text-red-600">
                {errors.maSoThue.message}
              </p>
            )}
          </div>
          <Button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      {/* <DialogDemo /> */}
    </div>
  );
}
