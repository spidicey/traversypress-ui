import BackButton from "@/components/BackButton";
import DonHangTable from "@/components/donhang/DonHangTable";
import KhachHangTable from "@/components/khachhang/KhachHangTable";

const KhachHangPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <DonHangTable title="Quản lý đơn hàng" />
    </>
  );
};

export default KhachHangPage;
