import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Input,
  Modal,
  Progress,
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
import { useNavigate } from "react-router-dom";
import ShoppingCart from "../../components/cards/ShoppingCart/ShoppingCart.JSX";

const HeaderLayout = () => {
  const [modal, setModal] = useState(false);
  const totalPrice = product.reduce((accumulator, product) => {
    const priceAsNumber = parseFloat(product.discount_price.replace(",", "."));
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
  const [discountData, setDiscountData] = useState({
    price: "",
    freight: "",
    discount_coupon: "",
    coupon_code: "",
    total_price: "",
  });
  const [, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();

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

    // Obter a discountData atual em formato "YYYY-MM-DD"
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
          setDiscountData({
            discount_coupon: discountCoupon,
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

  function handleSaveData(data) {
    setLoadingData(true);

    setTimeout(() => {
      setData({
        price: data.price,
        freight: data.freight,
        discount_coupon: data.discount_coupon,
        coupon_code: data.coupon_code,
        total_price: data.total_price,
      });
      setLoadingData(false);

      // Navega para a página de compra após salvar os dados
      navigate("/buy");
      setModal(false);
    }, 1500);
  }

  async function deleteDiscountData() {
    setDiscountData((prevData) => ({
      ...prevData,
      discount_coupon: "",
    }));
  }

  return (
    <Flex gap={"md"} className={classes.control}>
      <Modal
        size={"xl" + "xl"}
        opened={modal}
        onClose={() => {
          setModal(false);
          deleteDiscountData();
          setLoadingData(false);
        }}
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
            className={classes.product_card}
            mah={380}
          >
            {product.map((item, index) => (
              <ShoppingCart
                index={index}
                image={item.image}
                name={item.name}
                discount_percentage={item.discount_percentage}
                description={item.description}
                discount_price={item.discount_price}
                price={item.price}
              />
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
                <Text size="sm" color="green">
                  Grátis
                </Text>
              </Flex>
              <Flex direction={"row"} justify={"space-between"} w={"100%"}>
                <Text
                  color="blue"
                  size="sm"
                  fw={600}
                  onClick={() => setDiscountModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  {discountData.discount_coupon
                    ? "Alterar cupom"
                    : "Inserir código de cupom"}
                </Text>
                <Text size="sm" style={{ cursor: "pointer" }}>
                  {discountData.discount_coupon}
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
                  placeholder="Inserir código do cupom"
                  leftSection={<IconTicket color="#FF8C00" />}
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
                      loading={inputLoad}
                      h={30}
                      onClick={handleSaveCoupon}
                    >
                      Adicionar Cupom
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
              <Button
                color="#FF8C00"
                w={"100%"}
                loading={loadingData}
                h={50}
                onClick={() => {
                  handleSaveData({
                    price: "100.00", // Substitua por valores reais ou de um estado
                    freight: "15.00",
                    discount_coupon: "10.00",
                    coupon_code: "PROMO2024",
                    total_price: "105.00",
                  });
                }}
              >
                <Text fw={600}>Continuar compra</Text>
              </Button>
            </Flex>
          </Card>
        </Flex>
        <Flex direction={"column"} gap={"sm"} my={"lg"} w={"62.5%"} className={classes.freight_card}>
          <Flex direction={"row"} justify={"space-between"}>
            <Text fw={500}>Frete</Text>
            <Text fw={600} color="green">
              Grátis
            </Text>
          </Flex>
          <Divider />
          <Flex justify={"space-between"} align={"center"} gap={"xs"}>
            <Progress color="green" value={100} w={"87%"} className={classes.progress_card} />
            <Text size="xs" color="green" fw={600}>
              Frete grátis
            </Text>
          </Flex>
          <Text size="sm">
            <Flex direction={"row"} gap={4}>
              Nas compras acima de R$200, o <Text fw={600}>frete</Text> é
              grátis.
            </Flex>
          </Text>
        </Flex>
      </Modal>
      <Flex className={classes.image}>
        <Image w={200} src={SystemLogo} />
      </Flex>
      <Input
        placeholder="O que está buscando?"
        rightSection={<IconSearch style={{ paddingRight: 10 }} />}
        rightSectionWidth={30}
        width={200}
        w={500}
      />

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
  );
};

export default HeaderLayout;
