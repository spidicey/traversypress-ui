import BackButton from "@/components/BackButton";
import PhieuNhapTable from "@/components/phieunhap/PhieuNhapTable";
import PhieuSuaTable from "@/components/phieusua/PhieuSuaTable";
import PostsPagination from "@/components/posts/PostsPagination";
import React from "react";

const PhieuXuatPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <PhieuSuaTable title="Phiếu Sửa" />
    </>
  );
};

export default PhieuXuatPage;
