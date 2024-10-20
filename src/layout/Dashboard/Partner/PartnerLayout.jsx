import { Flex } from "@mantine/core";
import BayerPartner from "../../../assets/dashboard/partners/bayer.png";
import PetLovePartner from "../../../assets/dashboard/partners/petlove.png";
import SyngentaPartner from "../../../assets/dashboard/partners/syngenta.png";
import PartnerCard from "../../../components/cards/PartnerCard/PartnerCard";
import DividerTextComponent from "../../../components/divider/DividerText/DividerText";
import classes from "./PartnerLayout.module.css"

const PartnerLayout = () => {
  return (
    <Flex direction={"column"} gap={30} px={50}>
      <DividerTextComponent        
        title="PARCEIROS"        
      />
      <Flex className={classes.container_partners} justify={"center"} align={"center"} gap={"md"}>
        <PartnerCard image={SyngentaPartner} />
        <PartnerCard image={PetLovePartner} />
        <PartnerCard image={BayerPartner} />
      </Flex>
    </Flex>
  );
};

export default PartnerLayout;
