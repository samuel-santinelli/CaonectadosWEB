import { Carousel } from "@mantine/carousel";
import { Divider, Flex } from "@mantine/core";
import PromotionCard from "../../../components/cards/PromotionCard/PromotionCard";

const PromotionLayout = () => {
  return (
    <Flex direction={"column"} gap={30} px={50}>
      <Divider
        my="xs"
        label="PROMOÇÕES"
        labelPosition="center"
        flex={1}
        px={20}
      />
      <Carousel
        slideSize="25.333333%"
        withIndicators={false}
        withControls={true}
        align="start"
        
        slidesToScroll={4}
        controlSize={50}
      >
        {[...Array(20)].map((_, index) => (
          <Carousel.Slide key={index}>
            <PromotionCard index={index} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Flex>
  );
};

export default PromotionLayout;
