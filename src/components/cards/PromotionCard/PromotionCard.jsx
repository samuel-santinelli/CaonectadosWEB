import { Badge, Button, Card, Flex, Group, Image, Text } from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import PortionImage from "../../../assets/dashboard/promotion/portion.png";

const PromotionCard = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={"300px"}>
      <Card.Section component="a">
        <Flex justify={"center"} p={20}>
          <Image
            src={PortionImage}
            style={{ backgroundSize: "cover" }}
            height={180}
          />
        </Flex>
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Ração de cachorro</Text>
        <Badge color="red">10% OFF</Badge>
      </Group>

      <Flex direction={"column"} gap={"xs"}>
        <Text size="sm" c="dimmed">
          A Ração Úmida Whiskas Sachê Frango ao Molho para Gatos Filhotes
          auxilia no desenvolvimento como também no...
        </Text>

        <Flex gap={"xs"}>
          <Text>131,90 R$</Text>
          <Text td="line-through" color="gray" size="xs">
            141,90 R$
          </Text>
        </Flex>
      </Flex>
      <Button
        fullWidth
        mt="md"
        radius="md"
        color={"orange"}
        rightSection={<IconShoppingCartPlus size={20} />}
      >
        Adicionar
      </Button>
    </Card>
  );
};

export default PromotionCard;
