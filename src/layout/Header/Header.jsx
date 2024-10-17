import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Input,
  Loader,
  Modal,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import SystemLogo from "../../assets/logo/Logo.png";
import classes from "./Header.module.css";
import {
  IconCubePlus,
  IconExclamationCircleFilled,
  IconLogout,
  IconSearch,
  IconShoppingCart,
  IconTicket,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { product } from "../../models/product";

const HeaderLayout = () => {
  const [modal, setModal] = useState(false);
  const totalPrice = product.reduce((accumulator, product) => {
    const priceAsNumber = parseFloat(product.discountPrice.replace(",", "."));
    return accumulator + priceAsNumber;
  }, 0);
  const formattedPrice = parseFloat(totalPrice).toFixed(2);
  const [reais, centavos] = formattedPrice.split(".");
  const [discountModal, setDiscountModal] = useState(false);
  const [discountCoupon, setDiscountCoupon] = useState("");
  const [inputLoad, setInputLoad] = useState(false);
  const [discountCouponError, setDiscountCouponError] = useState(false);
  const [discountCouponErrorMessage, setDiscountCouponErrorMessage] =
    useState("");
  const [data, setData] = useState({
    discountCoupon: "",
  });

  const validCoupons = [
    { name: "W3LCOM3", expired_date: "2024-12-31" }, // Válido até o final do ano
    { name: "PETLOVE10", expired_date: "2024-11-30" }, // Válido para novembro
    { name: "FREESHIP", expired_date: "2024-10-01" }, // Já expirado
    { name: "CUIDADOSVIP", expired_date: "2024-12-15" }, // Expira em dezembro
    { name: "AMIGOFIEL", expired_date: "2024-09-30" }, // Já expirado
    { name: "PETVIP20", expired_date: "2025-01-31" }, // Expira em janeiro de 2025
    { name: "VERAOPET", expired_date: "2024-08-31" }, // Já expirado
  ];

  const handleSaveCoupon = () => {
    setInputLoad(true);

    // Obter a data atual em formato "YYYY-MM-DD"
    const data_atual = new Date().toISOString().split("T")[0];

    // Filtrar o cupom válido com base no nome
    const validCoupon = validCoupons.find(
      (item) => item.name === discountCoupon
    );

    if (validCoupon) {
      // Verificar se o cupom está expirado
      if (validCoupon.expired_date >= data_atual) {
        setTimeout(() => {
          setInputLoad(false);
          setDiscountCouponError(false);
          setDiscountCoupon("");
          setDiscountCouponErrorMessage("");
          setDiscountModal(false);
          setData({
            discountCoupon: discountCoupon,
          });
        }, 2000);
      } else {
        // Cupom expirado
        setTimeout(() => {
          setInputLoad(false);
          setDiscountCouponError(true);
          setDiscountCouponErrorMessage("Este cupom já expirou.");
        }, 1000);
      }
    } else {
      // Cupom não encontrado
      setTimeout(() => {
        setInputLoad(false);
        setDiscountCouponError(true);
        setDiscountCouponErrorMessage(
          "Cupom inválido. Verifique o código inserido."
        );
      }, 1000);
    }
  };

  async function deleteData() {
    setData((prevData) => ({
      ...prevData,
      discountCoupon: "",
    }));
  }

  return (
    <Flex gap={45} className={classes.control}>
      <Modal
        size={"xl" + "xl"}
        opened={modal}
        onClose={() => setModal(false)}
        centered
        title={
          <Flex direction={"row"} align={"center"} gap={"xs"}>
            <Text fw={600} size="xl">
              Carrinho
            </Text>
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
              <Flex direction={"row"} justify={"space-between"} w={"100%"}>
                <Text
                  color="blue"
                  size="sm"
                  fw={600}
                  onClick={() => setDiscountModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  {data.discountCoupon
                    ? "Alterar cupom"
                    : "Inserir código de cupom"}
                </Text>
                <Text size="sm" style={{ cursor: "pointer" }}>
                  {data.discountCoupon}
                </Text>
              </Flex>
              <Modal
                opened={discountModal}
                onClose={() => {
                  setDiscountModal(false);
                  setInputLoad(false);
                  setDiscountCouponError(false);
                  setDiscountCoupon("");
                  setDiscountCouponErrorMessage("");
                  deleteData();
                }}
                size={"md"}
                centered
                title={
                  <Flex direction={"row"} align={"center"} gap={"xs"}>
                    <Text fw={600} size="xl">
                      Cupons
                    </Text>
                  </Flex>
                }
              >
                <TextInput
                  py={50}
                  placeholder="Inserir código do cupom"
                  leftSection={<IconTicket color="blue" />}
                  size="md"
                  error={
                    discountCouponError ? (
                      <Flex align={"center"} gap={4}>
                        <IconExclamationCircleFilled size={15} />
                        <Text size="xs" fw={600}>
                          {discountCouponErrorMessage}
                        </Text>
                      </Flex>
                    ) : (
                      false
                    )
                  }
                  onChange={(e) => setDiscountCoupon(e.target.value)}
                  value={discountCoupon}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSaveCoupon();
                    }
                  }} // Apenas chama handleSaveCoupon se a tecla Enter for pressionada
                  maxLength={23}
                  rightSectionWidth={180}
                  rightSection={
                    <Button
                      disabled={discountCoupon === ""}
                      ml={15}
                      size="xs"
                      w={140}
                      h={30}
                      onClick={handleSaveCoupon}
                    >
                      {inputLoad ? (
                        <Loader size={"xs"} color="white" />
                      ) : (
                        "Adicionar Cupom"
                      )}
                    </Button>
                  }
                />
              </Modal>

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
            aria-label="User"
            color="black"
            className={classes.actionIcons}
          >
            <IconUser style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Shopping Cart"
            color="black"
            className={classes.actionIcons}
            onClick={() => setModal(true)}
          >
            <IconShoppingCart style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Cube Plus"
            color="black"
            className={classes.actionIcons}
          >
            <IconCubePlus style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Logout"
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
