import DefaultView from "../DefaultView/DefaultView";
import DefaultTitle from "../DefaultTitle/DefaultTitle";
import { product } from "../../models/product";
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  CopyButton,
  Divider,
  em,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  Radio,
  rem,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import {
  IconBarcode,
  IconCheck,
  IconCopy,
  IconCreditCard,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { formatCEP } from "../../utils/cep-formatter";
import { useNavigate } from "react-router-dom";
import classes from "./FinalizePurchase.module.css";
import { useMediaQuery } from "@mantine/hooks";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { motion } from "framer-motion";
import ReactInputMask from "react-input-mask";
import QRCode from "react-qr-code";
import Barcode from "react-barcode";

const FinalizePurchase = () => {
  const navigate = useNavigate();
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [, setCreditCard] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardLoading, setCardLoading] = useState(false);
  const [pixModal, setPixModal] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const adress_form = useForm({
    initialValues: {
      cep: "",
      street: "",
      district: "",
      number: "",
      state: "",
      city: "",
      complement: "",
    },
  });

  const handleCepChange = async (cep) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setCepLoading(true);
      setCepError(false);

      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCep}/json/`
        );
        const data = await response.json();

        if (data.erro) {
          setCepError(true);
          return;
        }

        adress_form.setValues({
          cep: formatCEP(adress_form.values.cep),
          street: data.logradouro,
          district: data.bairro,
          state: data.estado,
          city: data.localidade,
          complement: data.complemento || "",
          number: "", // Deixe o número em branco para o usuário preencher
        });
        setCepLoading(false);
      } catch (error) {
        return false;
      } finally {
        // Certifique-se de que o loading é definido como false no final da requisição
        setCepLoading(false);
      }
    }
  };

  const data = [
    {
      title: "Cartão",
      icon: <IconCreditCard color="orange" />,
    },
    {
      title: "PIX",
      icon: (
        <Image
          src={"https://img.icons8.com/color/48/pix.png"}
          maw={25}
          h={22}
        />
      ),
    },
    {
      title: "Boleto Bancário",
      icon: <IconBarcode color="orange" />,
    },
  ];

  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setState((prevState) => ({ ...prevState, focus: e.target.name }));
  };

  const cards = data.map((item) => (
    <motion.div
      style={{
        overflow: "hidden",
      }}
      animate={{
        height: paymentMethod === "Cartão" ? "auto" : "50px",
      }}
      initial={{ height: "100px" }}
      transition={{
        duration: 0.4,
        ease: "circOut",
      }}
    >
      <Modal
        opened={ticketModal}
        onClose={() => setTicketModal(false)}
        centered
        title={
          <Flex direction={"row"} gap={"xs"}>
            <IconBarcode color="teal" />
            <Text fw={500}>Realizar pagamento via boleto</Text>
          </Flex>
        }
      >
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          gap={"xl"}
          p={15}
        >
          <Text size="sm">Escaneie esse QR code no app do seu banco</Text>
          <Barcode
            value="948ade04-f084-4b51-bdbb-5695b941125b"
            width={0.8}
            fontSize={15}
          />
          <Flex direction={"column"} gap={"md"} w={"100%"}>
            <Divider label="Ou copie manualmente o código" />
            <TextInput
              value={"10412e79-af5f-44bb-80a1-45999df82d94"}
              rightSection={
                <CopyButton
                  value="10412e79-af5f-44bb-80a1-45999df82d94"
                  timeout={2000}
                >
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      withArrow
                      position="right"
                    >
                      <ActionIcon
                        color={copied ? "teal" : "gray"}
                        variant="subtle"
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck style={{ width: rem(16) }} />
                        ) : (
                          <IconCopy style={{ width: rem(16) }} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              }
            />
            <Button mt={"md"} color="teal">
              Continuar
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <Modal
        opened={pixModal}
        onClose={() => setPixModal(false)}
        centered
        title={
          <Flex direction={"row"} gap={"xs"}>
            <Image
              src={"https://img.icons8.com/color/48/pix.png"}
              maw={25}
              h={22}
            />
            <Text fw={500}>Realizar pagamento via PIX</Text>
          </Flex>
        }
      >
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          gap={"xl"}
          p={15}
        >
          <Text size="sm">Escaneie esse QR code no app do seu banco</Text>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "70%", width: "100%" }}
            value="131231"
            viewBox={`0 0 256 256`}
          />
          <Flex direction={"column"} gap={"md"} w={"100%"}>
            <Divider label="Ou copie manualmente o código" />
            <TextInput
              value={"10412e79-af5f-44bb-80a1-45999df82d94"}
              rightSection={
                <CopyButton
                  value="10412e79-af5f-44bb-80a1-45999df82d94"
                  timeout={2000}
                >
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied" : "Copy"}
                      withArrow
                      position="right"
                    >
                      <ActionIcon
                        color={copied ? "teal" : "gray"}
                        variant="subtle"
                        onClick={copy}
                      >
                        {copied ? (
                          <IconCheck style={{ width: rem(16) }} />
                        ) : (
                          <IconCopy style={{ width: rem(16) }} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              }
            />
            <Button mt={"md"} color="teal">
              Continuar
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <Radio.Card
        radius="md"
        value={item.title}
        key={item.title}
        p={10}
        w={"100%"}
        style={{
          height:
            item.title === "Cartão" && paymentMethod === "Cartão"
              ? 300
              : "auto",
        }}
      >
        <Flex direction={"column"} gap={"xl"}>
          <Flex align={"center"} justify={"space-between"}>
            <Group>
              <Flex direction={"row"} gap={"sm"} align={"center"}>
                {item.icon}
                <Text>{item.title}</Text>
              </Flex>
            </Group>
            <Radio.Indicator
              onClick={() => {
                if (item.title === "Cartão") {
                  setCreditCard(true);
                }
                setPaymentMethod(item.title);
                setCreditCard(false);
              }}
              color="orange"
            />
          </Flex>
          {paymentMethod === "Cartão" && item.title === "Cartão" && (
            <Flex gap={"xl"}>
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
                placeholders={{
                  name: "Seu nome",
                }}
              />
              <Flex direction={"column"} gap={"xs"}>
                <ReactInputMask
                  mask="9999 9999 9999 9999"
                  value={state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  w={"100%"}
                >
                  {(inputProps) => (
                    <TextInput
                      {...inputProps}
                      type="text"
                      name="number"
                      placeholder="Número do cartão"
                    />
                  )}
                </ReactInputMask>
                <TextInput
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <Flex gap={"xs"}>
                  <ReactInputMask
                    mask="99/99"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  >
                    {(inputProps) => (
                      <TextInput
                        {...inputProps}
                        type="text"
                        name="expiry"
                        placeholder="MM/YY Expiração"
                      />
                    )}
                  </ReactInputMask>
                  <ReactInputMask
                    mask="999"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  >
                    {(inputProps) => (
                      <TextInput
                        {...inputProps}
                        type="text"
                        name="cvc"
                        placeholder="CVC"
                      />
                    )}
                  </ReactInputMask>
                </Flex>
                <Flex gap={"md"} justify={"end"} mt={"xs"}>
                  <Button
                    variant="outline"
                    color="orange"
                    onClick={() =>
                      setState({
                        number: "",
                        expiry: "",
                        cvc: "",
                        name: "",
                        focus: "",
                      })
                    }
                  >
                    Limpar
                  </Button>
                  <Button
                    color="orange"
                    loading={cardLoading}
                    onClick={() => {
                      setCardLoading(true);
                      setTimeout(() => {
                        setCardLoading(false);
                      }, 1000);
                    }}
                  >
                    Salvar
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Radio.Card>
    </motion.div>
  ));

  return (
    <DefaultView>
      {/* <DefaultTitle title="Finalizar pedido" /> */}
      <Flex
        direction={"row"}
        gap={"md"}
        w={"100%"}
        className={classes.cards_container}
      >
        {/* <Flex direction={"column"} gap={"md"}>
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
        </Flex> */}
        <Flex
          direction={"column"}
          w={"75%"}
          gap={"md"}
          className={classes.cards}
        >
          <Flex justify={"start"} direction={"column"}>
            <DefaultTitle title="Forma de pagamento" />
            <Text size="xs">
              Escolha abaixo a opção que melhor se adequa às suas necessidades e
              prossiga com a finalização do pedido.
            </Text>
          </Flex>
          <Card
            withBorder
            className={classes.cards_payment_container}
            style={{ height: paymentMethod === "Cartão" ? 500 : "auto" }}
          >
            <Flex
              w={"100%"}
              justify={"center"}
              align={"center"}
              className={classes.cards_payment_container_v2}
              gap={"md"}
            >
              <Radio.Group
                value={paymentMethod}
                onChange={setPaymentMethod}
                label="Escolha uma forma de pagamento"
                description="Preencha as informações conforme necessário"
                w={"100%"}
              >
                <Stack pt="md" gap="xs">
                  {cards}
                </Stack>
              </Radio.Group>
            </Flex>
          </Card>
          <Flex justify={"start"} mt={"md"} direction={"column"}>
            <DefaultTitle title="Endereço de entrega" />
            <Text size="xs">
              Insira o endereço onde deseja que seu pedido seja entregue.
              Certifique-se de que todas as informações estão corretas para
              evitar atrasos na entrega.
            </Text>
          </Flex>
          <Card withBorder>
            <SimpleGrid cols={isMobile ? 1 : 3}>
              <TextInput
                {...adress_form.getInputProps("cep")}
                value={adress_form.values.cep}
                label="CEP"
                rightSection={cepLoading && <Loader size={"xs"} mr={20} />}
                disabled={cepLoading}
                error={cepError && "CEP inválido"}
                maxLength={8}
                onBlur={(e) => {
                  handleCepChange(e.target.value);
                }}
                hideControls
              />
              <TextInput
                label="Estado"
                {...adress_form.getInputProps("state")}
                disabled={cepLoading}
              />
              <TextInput
                label="Cidade"
                {...adress_form.getInputProps("city")}
                disabled={cepLoading}
              />
              <TextInput
                label="Rua"
                {...adress_form.getInputProps("street")}
                disabled={cepLoading}
              />
              <TextInput
                label="Bairro"
                {...adress_form.getInputProps("district")}
                disabled={cepLoading}
              />
              <TextInput
                label="Número"
                {...adress_form.getInputProps("number")}
                disabled={cepLoading}
              />
              <TextInput
                label="Complemento"
                {...adress_form.getInputProps("complement")}
                disabled={cepLoading}
              />
            </SimpleGrid>
          </Card>
          <Flex justify={"end"} gap={"md"}>
            <Button
              w={140}
              h={45}
              variant="outline"
              color="orange"
              onClick={() => navigate("/")}
            >
              Cancelar
            </Button>
            <Button
              w={140}
              h={45}
              color="orange"
              onClick={() => {
                if (paymentMethod === "PIX") {
                  setPixModal(true);
                } else if (paymentMethod === "Boleto Bancário") {
                  setTicketModal(true);
                }
              }}
            >
              Continuar
            </Button>
          </Flex>
        </Flex>
        <Flex
          direction={"column"}
          w={"70%"}
          align={"start"}
          gap={"md"}
          className={classes.cards}
          mt={isMobile ? "xl" : ""}
        >
          <Flex direction={"column"}>
            <DefaultTitle title={"Resumo da compra"} />
            <Text size="xs">
              Confira os detalhes do seu pedido antes de finalizar.
              Certifique-se de que todas as informações estão corretas.
            </Text>
          </Flex>
          <Card withBorder w={"100%"}>
            <Flex mb={"md"}>
              <Tooltip.Group openDelay={300} closeDelay={100}>
                {product.map((item, index) => (
                  <Avatar.Group
                    spacing="sm"
                    key={index}
                    style={{ borderRadius: "100%" }}
                  >
                    <Tooltip label={item.name} withArrow>
                      <Avatar src={item.image} radius="xl" />
                    </Tooltip>
                  </Avatar.Group>
                ))}
                <Tooltip
                  withArrow
                  label={
                    <Flex direction={"column"}>
                      <Text size="xs">{product.map((item) => item.name)}</Text>
                    </Flex>
                  }
                >
                  <Avatar radius="xl">+{product.length}</Avatar>
                </Tooltip>
              </Tooltip.Group>
            </Flex>
            <Flex justify={"space-between"} w={"100%"}>
              <Flex direction={"row"} justify={"space-between"} w={"100%"}>
                <Text size="sm">Produto ({product.length})</Text>
                <Text size="sm">
                  <Flex direction={"row"} gap={2}>
                    R$ 147
                    <Text size="xs">23</Text>
                  </Flex>
                </Text>
              </Flex>
            </Flex>
            <Flex justify={"space-between"} w={"100%"}>
              <Flex direction={"row"} justify={"space-between"} w={"100%"}>
                <Text size="sm">Frete</Text>
                <Text size="sm" color="green">
                  Grátis
                </Text>
              </Flex>
            </Flex>

            <Divider w={"100%"} mt={10} />
            <Flex justify={"space-between"} w={"100%"} mt={10}>
              <Flex direction={"row"} justify={"space-between"} w={"100%"}>
                <Text size="sm">Você pagará</Text>
                <Text size="md">
                  <Flex direction={"row"} gap={2} fw={600}>
                    R$ 147
                    <Text size="xs" fw={600}>
                      23
                    </Text>
                  </Flex>
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </DefaultView>
  );
};

export default FinalizePurchase;
