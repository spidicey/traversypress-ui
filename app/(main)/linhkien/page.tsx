import BackButton from "@/components/BackButton";
import LinhKienTable from "@/components/linhkien/LinhKienTable";

const LinhKienPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <LinhKienTable title="Quản lý linh kiện" />
    </>
  );
};

export default LinhKienPage;
