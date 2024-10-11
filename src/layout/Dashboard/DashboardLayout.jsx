import { Flex } from "@mantine/core";
import FooterComponent from "../../components/footer/FooterComponent";
import BannerLayout from "./Banner/BannerLayout";
import PromotionLayout from "./Promotion/PromotionLayout";
import PartnerLayout from "./Partner/PartnerLayout";

const DashboardLayout = () => {
  return (
    <Flex direction={"column"} gap={50}>
      <BannerLayout />
      <PromotionLayout />
      <PartnerLayout />
      <FooterComponent />
    </Flex>
  );
};

export default DashboardLayout;
