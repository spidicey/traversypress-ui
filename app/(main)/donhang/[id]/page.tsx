import BackButton from "@/components/BackButton";
import CTDonHangaTable from "@/components/donhang/ct-donhang/CTDonHangTable";
import CTPhieuSuaTable from "@/components/phieusua/ct-phieusua/CTPhieuSuaTable";
import React from "react";

export default function page({
  params,
}: {
  params: {
    id: number;
  };
}) {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <CTDonHangaTable id={params.id} title="Chi tiết phiếu Sửa" />
    </>
  );
}
