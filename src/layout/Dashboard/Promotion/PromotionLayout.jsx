import { Carousel } from "@mantine/carousel";
import { Flex } from "@mantine/core";
import PromotionCard from "../../../components/cards/PromotionCard/PromotionCard";
import DividerTextComponent from "../../../components/divider/DividerText/DividerText";
import { product } from "../../../models/product";

const PromotionLayout = () => {
  function shuffleProduct(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Pega um índice aleatório
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos
    }
    return arr;
  }

  console.log(product);
  

  return (
    <Flex direction={"column"} gap={30} px={50}>
      <DividerTextComponent title="PROMOÇÕES" />
      <Carousel
        slideSize="25%" 
        withIndicators={false}
        withControls={true}
        align="start"
        slidesToScroll={4}
        controlSize={50}
        slideGap={"xl"} 
      >
        {shuffleProduct(product).map((item, index) => (          
          <Carousel.Slide>
            <PromotionCard
              key={index}
              image={item.image}
              name={item.name}
              discount_percentage={item.discount_percentage}
              description={item.description}
              price={item.price}
              discount_price={item.discount_price}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Flex>
  );
};

export default PromotionLayout;
