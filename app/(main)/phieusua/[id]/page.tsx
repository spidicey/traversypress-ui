import BackButton from "@/components/BackButton";
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
      <CTPhieuSuaTable id={params.id} title="Chi tiết đơn hàng" />
    </>
  );
}
