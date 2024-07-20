import BackButton from "@/components/BackButton";
import PhieuHenTable from "@/components/phieuhen/PhieuHenTable";
import PostsPagination from "@/components/posts/PostsPagination";

const PhieuHenPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <PhieuHenTable title="Phiếu Hẹn" />
      {/* <PostsPagination /> */}
    </>
  );
};

export default PhieuHenPage;
