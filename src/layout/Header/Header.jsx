import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  NumberInput,
  Text,
} from "@mantine/core";
import SystemLogo from "../../assets/logo/Logo.png";
import classes from "./Header.module.css";
import {
  IconCubePlus,
  IconLogout,
  IconSearch,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { product } from "../../models/product";

const HeaderLayout = () => {
  const [modal, setModal] = useState(true);
  const totalPrice = product.reduce((accumulator, product) => {
    const priceAsNumber = parseFloat(product.discountPrice.replace(",", "."));
    return accumulator + priceAsNumber;
  }, 0);
  const formattedPrice = parseFloat(totalPrice).toFixed(2);
  const [reais, centavos] = formattedPrice.split(".");

  return (
    <Flex gap={45} className={classes.control}>
      <Modal
        size={"xl" + "xl"}
        opened={modal}
        onClose={() => setModal(false)}
        centered
        title={
          <Flex direction={"row"} align={"center"} gap={"xs"}>
            <Text fw={600} color="#FF8C00" size="xl">
              Carrinho
            </Text>
            <IconShoppingCart color="#FF8C00" />
          </Flex>
        }
      >
        <Flex direction={"row"} justify={"start"} align={"start"} gap={"xl"}>
          <Flex
            direction={"column"}
            gap={"xs"}
            style={{ overflow: "auto" }}
            mah={500}
          >
            {product.map((item, index) => (
              <Card key={index} withBorder maw={700} mih={180}>
                <Flex direction={"row"} gap={"md"}>
                  <Flex
                    direction={"row"}
                    justify={"start"}
                    align={"center"}
                    gap={"xs"}
                    p={5}
                  >
                    <Flex justify={"center"} align={"center"}>
                      <Image src={item.image} w={100} h={100} />
                    </Flex>
                    <Flex direction={"column"} gap={5}>
                      <Text fw={500}>{item.name}</Text>
                      <Text>{item.description}</Text>
                      <Flex
                        direction={"row"}
                        justify={"space-between"}
                        align={"center"}
                      >
                        <NumberInput
                          defaultValue={1}
                          min={0}
                          w={100}
                          max={10}
                          step={1}
                          withControls
                        />
                        <Flex direction={"column"} align={"center"}>
                          <Flex direction={"row"} gap={5}>
                            <Text
                              size="xs"
                              color="green"
                            >{`-${item.discountPercentage}`}</Text>
                            <Text
                              td="line-through"
                              size="xs"
                            >{`R$ ${item.price}`}</Text>
                          </Flex>
                          <Text
                            fw={500}
                            color="green"
                          >{`R$ ${item.discountPrice}`}</Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Flex>
          <Card withBorder w={400}>
            <Flex
              direction={"column"}
              justify={"start"}
              align={"start"}
              gap={"xs"}
              p={5}
            >
              <Text fw={600}>Resumo da compra</Text>
              <Divider w={"100%"} />
              <Flex direction={"row"} justify={"space-between"} w={"100%"}>
                <Text size="sm">Produto ({product.length})</Text>
                <Text size="sm">
                  <Flex direction={"row"} gap={2}>
                    R$ {reais}
                    <Text size="xs">{centavos}</Text>
                  </Flex>
                </Text>
              </Flex>
              <Flex direction={"row"} justify={"space-between"} w={"100%"}>
                <Text size="sm">Frete</Text>
                <Text size="sm">R$ 29</Text>
              </Flex>
              <Text color="blue" size="sm" fw={600}>
                Inserir código de cupom
              </Text>
              <Flex
                direction={"row"}
                justify={"space-between"}
                w={"100%"}
                mt={"md"}
              >
                <Text size="md" fw={600}>
                  Total
                </Text>
                <Text size="md" fw={600}>
                  <Flex direction={"row"} gap={2}>
                    R$ {reais}
                    <Text size="xs">{centavos}</Text>
                  </Flex>
                </Text>
              </Flex>
            </Flex>

            <Flex justify={"center"} align={"center"} mt={"xl"}>
              <Button color="#FF8C00" w={"100%"} h={50}>
                <Text fw={600}>Continuar compra</Text>
              </Button>
            </Flex>
          </Card>
        </Flex>
      </Modal>
      <Flex>
        <img src={SystemLogo} style={{ width: 200 }} />
      </Flex>
      <Input
        placeholder="O que está buscando?"
        rightSection={<IconSearch style={{ paddingRight: 10 }} />}
        rightSectionWidth={30}
        width={200}
        w={500}
      />

      <Flex className={classes.icons}>
        <ActionIcon.Group>
          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Gallery"
            color="black"
            className={classes.actionIcons}
          >
            <IconUser style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Settings"
            color="black"
            className={classes.actionIcons}
            onClick={() => setModal(true)}
          >
            <IconShoppingCart style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Likes"
            color="black"
            className={classes.actionIcons}
          >
            <IconCubePlus style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Likes"
            color="black"
            className={classes.actionIcons}
          >
            <IconLogout style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>
        </ActionIcon.Group>
      </Flex>
    </Flex>
  );
};

export default HeaderLayout;
