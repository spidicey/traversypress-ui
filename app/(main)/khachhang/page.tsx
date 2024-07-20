import BackButton from "@/components/BackButton";
import KhachHangTable from "@/components/khachhang/KhachHangTable";

const KhachHangPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <KhachHangTable title="Quản lý khách hàng" />
    </>
  );
};

export default KhachHangPage;
