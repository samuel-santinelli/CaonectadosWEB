import { Button, Card, Divider, Flex, Text } from "@mantine/core";
import classes from "./DashboardLayout.module.css";
import BallImage from "../../assets/dashboard/products/ball.png";
import BedImage from "../../assets/dashboard/products/bed.png";
import FoodImage from "../../assets/dashboard/products/food.png";

const DashboardLayout = () => {
  return (
    <Flex direction={"column"} gap={50}>
      <Flex className={classes.image_container}>
        <Flex direction={"column"} align={"center"} gap={10}>
          <Button w={200} color="black" h={50} className={classes.button}>
            Confira
          </Button>
          <Text color="#fff">Roupas para Pets com 10% de desconto</Text>
        </Flex>
      </Flex>
      <Flex justify={"center"} gap={50}>
        <Card withBorder={true}>
          <Flex direction={"row"} justify={"center"} align={"center"} gap={10}>
            <img src={FoodImage} />
            <Text>Produtos com frete grátis</Text>
          </Flex>
        </Card>
        <Card withBorder={true}>
          <Flex direction={"row"} justify={"center"} align={"center"} gap={20}>
            <img src={BedImage} style={{width: 80}} />
            <Text>Produtos com frete grátis</Text>
          </Flex>
        </Card>
        <Card withBorder={true}>
          <Flex direction={"row"} justify={"center"} align={"center"} gap={10}>
            <img src={BallImage} />
            <Text>Produtos com frete grátis</Text>
          </Flex>
        </Card>
      </Flex>
        <Flex justify={"center"} align={"center"}>
        <Divider my="xs" label="PROMOÇÕES" lab labelPosition="center" color="black" />

        </Flex>
    </Flex>
  );
};

export default DashboardLayout;
