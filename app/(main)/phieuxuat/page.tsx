import BackButton from "@/components/BackButton";
import PhieuXuatTable from "@/components/phieuxuat/PhieuXuatTable";
import PostsPagination from "@/components/posts/PostsPagination";

const PhieuXuatPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <PhieuXuatTable title="Phiếu Xuất" />
    </>
  );
};

export default PhieuXuatPage;
