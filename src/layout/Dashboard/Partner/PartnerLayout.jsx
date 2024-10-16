import { Divider, Flex } from "@mantine/core";
import BayerPartner from "../../../assets/dashboard/partners/bayer.png";
import PetLovePartner from "../../../assets/dashboard/partners/petlove.png";
import SyngentaPartner from "../../../assets/dashboard/partners/syngenta.png";
import PartnerCard from "../../../components/cards/PartnerCard/PartnerCard";

const PartnerLayout = () => {
  return (
    <Flex direction={"column"} gap={30} px={50}>
      <Divider
        my="xs"
        label="PARCEIROS"
        labelPosition="center"
        flex={1}
        px={20}
      />
      <Flex direction={"row"} justify={"center"} align={"center"} gap={50}>
        <PartnerCard image={SyngentaPartner} />
        <PartnerCard image={PetLovePartner} />
        <PartnerCard image={BayerPartner} />
      </Flex>
    </Flex>
  );
};

export default PartnerLayout;
