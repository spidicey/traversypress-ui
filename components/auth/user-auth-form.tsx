"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "../icons";
import Cookies from "js-cookie";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: FormData) {
    try {
      const signInResponse = await fetch(
        "http://localhost:8080/api/auth/account/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            password: data.password,
          }),
        }
      );

      const signInResult = await signInResponse.json();
      if (signInResult.role === "Khách hàng") {
        toast({
          title: "Tài khoản không đủ quyền",
          description: "Vui lòng kiểm tra lại tài khoản của bạn.",
          variant: "destructive",
        });
        return;
      }
      console.log(signInResult.accessToken);
      setIsLoading(false);

      if (!signInResponse.ok) {
        toast({
          title: "Something went wrong.",
          description:
            signInResult.message ||
            "Your sign-in request failed. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Save token into cookies
      Cookies.set("token", signInResult.accessToken, { expires: 7 }); // Set the token to expire in 7 days or as needed

      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        variant: "default",
      });

      // Redirect to the homepage or any other page
      router.push("/");
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "An error occurred",
        description:
          error.message ||
          "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    }
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only">Username or Email</Label>
            <Input
              id="username"
              type="input"
              autoCapitalize="none"
              autoComplete="email"
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
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="pasword"
              placeholder="Mật khẩu"
              type="password"
              autoCapitalize="none"
              autoComplete="email"
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
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
