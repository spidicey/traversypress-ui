import BackButton from "@/components/BackButton";
import PhieuNhapTable from "@/components/phieunhap/PhieuNhapTable";
import PostsPagination from "@/components/posts/PostsPagination";

const PhieuXuatPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <PhieuNhapTable title="Phiếu Nhập" />
    </>
  );
};

export default PhieuXuatPage;
