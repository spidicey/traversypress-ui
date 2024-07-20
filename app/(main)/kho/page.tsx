import BackButton from "@/components/BackButton";
import KhoTable from "@/components/kho/KhoTable";

const KhoPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <KhoTable title="Quản lý Kho" />
    </>
  );
};

export default KhoPage;
