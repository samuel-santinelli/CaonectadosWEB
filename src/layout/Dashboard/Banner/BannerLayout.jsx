import { Button, Card, Flex, Text } from "@mantine/core";
import classes from "./BannerLayout.module.css";
import BallImage from "../../../assets/dashboard/products/ball.png";
import BedImage from "../../../assets/dashboard/products/bed.png";
import FoodImage from "../../../assets/dashboard/products/food.png";

const BannerLayout = () => {
  return (
    <>
      <Flex className={classes.image_container}>
        <Flex direction={"column"} align={"center"} gap={10}>
          <Button w={200} color="dark" h={50} className={classes.button}>
            Confira
          </Button>
          <Text color="#fff">Roupas para Pets com 10% de desconto</Text>
        </Flex>
      </Flex>
      <Flex justify={"center"} gap={160}>
        <Card withBorder={true} className={classes.card}>
          <Flex direction={"row"} justify={"center"} align={"center"} gap={10}>
            <img src={FoodImage} />
            <Text>Produtos com frete grátis</Text>
          </Flex>
        </Card>
        <Card withBorder={true} className={classes.card}>
          <Flex direction={"row"} justify={"center"} align={"center"} gap={20}>
            <img src={BedImage} style={{ width: 80 }} />
            <Text>Produtos com frete grátis</Text>
          </Flex>
        </Card>
        <Card
          withBorder={true}
          className={classes.card}          
        >
          <Flex direction={"row"} justify={"center"} align={"center"} gap={10}>
            <img src={BallImage} />
            <Text>Produtos com frete grátis</Text>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};

export default BannerLayout;
