import { Badge, Button, Card, Flex, Group, Image, Text } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";

const PromotionCard = ({
  key,
  image,
  name,
  description,
  price,
  discount_percentage,
  discount_price,
}) => {
  return (
    <Card
      key={key}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={"350px"}
      h={"460px"}
    >
      <Card.Section component="a">
        <Flex justify={"center"} p={20}>
          <Image src={image} style={{ backgroundSize: "cover" }} height={180} />
        </Flex>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {name.length > 20 ? name.substring(0, 15) + "..." : name}
        </Text>
        <Badge color="red">{`${discount_percentage} % OFF`}</Badge>
      </Group>

      <Flex direction={"column"} gap={"xs"}>
        <Text size="sm" c="dimmed">
          {description}
        </Text>

        <Flex gap={"xs"}>
          <Text>{`R$ ${discount_price}`}</Text>
          <Text td="line-through" color="gray" size="xs">
            {`R$ ${price}`}
          </Text>
        </Flex>
      </Flex>
      <Button
        fullWidth
        mt="md"        
        color={"orange"}
        rightSection={<IconShoppingCartPlus size={20} />}
      >
        Adicionar
      </Button>
    </Card>
  );
};

export default PromotionCard;
