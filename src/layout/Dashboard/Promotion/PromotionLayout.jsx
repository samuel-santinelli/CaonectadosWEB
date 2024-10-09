import { Carousel } from "@mantine/carousel";
import { Divider, Flex } from "@mantine/core";
import PromotionCard from "../../../components/cards/PromotionCard/PromotionCard";

const PromotionLayout = () => {
  return (
    <Flex justify={"center"} align={"center"} direction={"column"} gap={30}>
      <Divider
        my="xs"
        label="PROMOÇÕES"
        labelPosition="center"
        flex={1}
        px={20}
      />
      <Carousel
        withIndicators
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
      >
          <Flex direction={"row"} gap={50}>
          {[...Array(13)].map((_, index) => (
              <Carousel.Slide key={index}>
              <PromotionCard index={index} />
            </Carousel.Slide>
          ))}
          </Flex>
      </Carousel>
    </Flex>
  );
};

export default PromotionLayout;
