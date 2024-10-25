import { Card, Flex, Image, NumberInput, Text } from "@mantine/core";

const ShoppingCart = ({
  index,
  image,
  name,
  description,
  discount_percentage,
  price,
  discount_price,
}) => {
  return (
    <Card key={index} withBorder maw={"100%"} mih={200}>
      <Flex direction={"row"} gap={"md"}>
        <Flex
          direction={"row"}
          justify={"start"}
          align={"center"}
          gap={"xs"}
          p={5}
          w={"100%"}
        >
          <Flex justify={"center"} align={"center"}>
            <Image src={image} w={100} h={100} />
          </Flex>
          <Flex direction={"column"} gap={5} w={"100%"}>
            <Text fw={500}>{name}</Text>
            <Text>{description}</Text>
            <Flex direction={"row"} justify={"space-between"} align={"center"} w={"100%"}>
              <NumberInput defaultValue={1} min={0} w={100} max={10} step={1} />
              <Flex direction={"column"} align={"center"}>
                <Flex direction={"row"} gap={5}>
                  <Text
                    size="xs"
                    color="green"
                  >{`-${discount_percentage}`}</Text>
                  <Text td="line-through" size="xs">{`R$ ${price}`}</Text>
                </Flex>
                <Text fw={500} color="green">{`R$ ${discount_price}`}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default ShoppingCart;
