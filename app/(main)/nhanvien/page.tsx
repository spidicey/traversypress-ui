import BackButton from "@/components/BackButton";
import NhanVienTable from "@/components/nhanvien/NhanVienTable";

const NhanVienPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <NhanVienTable title="Quản lý nhân viên" />
    </>
  );
};

export default NhanVienPage;
