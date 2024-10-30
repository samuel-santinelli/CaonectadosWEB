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
  Progress,
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
  IconHourglassHigh,
  IconHourglassOff,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
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
  const [creditCard, setCreditCard] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardLoading, setCardLoading] = useState(false);
  const [pixModal, setPixModal] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [FinalizePurchase, setFinalizePurchase] = useState(false);
  const [finishPayment, setFinishPayment] = useState(false);
  const [creditCardModal, setCreditCardModal] = useState(false);

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

    validate: {
      cep: (value) => (value.length === 0 ? "CEP é obrigatório" : null),
      street: (value) => (value.length === 0 ? "Rua é obrigatória" : null),
      district: (value) => (value.length === 0 ? "Bairro é obrigatório" : null),
      number: (value) =>
        value.length === 0
          ? "Número é obrigatório"
          : isNaN(value) || Number(value) <= 0
          ? "O número deve ser um valor positivo"
          : null,
      state: (value) => (value.length === 0 ? "Estado é obrigatório" : null),
      city: (value) => (value.length === 0 ? "Cidade é obrigatória" : null),
    },
  });

  

  const credit_form = useForm({
    initialValues: {
      number: "",
      person_name: "",
      expiration_date: "",
      cvc: "",
    },
    validate: {
      number: (value) => (value.length < 16 ? "Número inválido" : null),
      person_name: (value) => typeof(value) === "number" || value === "" ? "Nome inválido" : "",
      expiration_date: (value) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (!regex.test(value)) {
          return "Formato inválido. Use MM/AAAA.";
        }
  
        const [month, year] = value.split("/").map(Number);
  

        if (year < currentYear) {
          return "O ano não pode ser menor que o atual.";
        }
  

        if (month < 1 || month > 12) {
          return "O mês deve estar entre 01 e 12.";
        }

        if (year === currentYear && month < currentMonth) {
          return "O mês não pode ser anterior ao mês atual.";
        }
  
        return null;
      },    
    }
  })

  


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
          number: "", 
        });
        setCepLoading(false);
      } catch (error) {
        return false;
      } finally {
        setCepLoading(false);
      }
    }
  };

  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const percentage = (timeLeft / 1800) * 100;

  const progressColor =
    percentage > 30 ? "teal" : percentage > 10 ? "orange" : "red";

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

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

  useEffect(() => {
    if (isMobile && paymentMethod === "Cartão") {
      setCreditCardModal(true);
    }
  }, [isMobile, paymentMethod]);

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
            style={{ height: "auto", maxWidth: "50%", width: "100%" }}
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
            <Button mt={"md"} color="teal" disabled={timeLeft === 0}>
              Continuar
            </Button>
          </Flex>
          <Flex
            gap={"xs"}
            justify={"center"}
            align={"center"}
            direction={"column"}
            w={"100%"}
          >
            <Text size="sm" fw={600}>
              {timeLeft !== 0 ? (
                <Flex gap={3} justify={"center"} align={"center"} w={"100%"}>
                  <IconHourglassHigh color="teal" />
                  <Text fw={500}>Código expira em </Text>
                  <Text color="teal" fw={600}>
                    {formatTime(timeLeft)}
                  </Text>
                </Flex>
              ) : (
                <Flex
                  gap={"xs"}
                  justify={"center"}
                  align={"center"}
                  direction={"column"}
                >
                  <Flex direction={"row"} gap={2}>
                    <IconHourglassOff color="red" size={20} />
                    <Text fw={700} color="red" size="sm">
                      Código expirado
                    </Text>
                  </Flex>
                  <Text size="xs">Efetue a compra novamente</Text>
                </Flex>
              )}
            </Text>
            <Progress
              style={timeLeft === 0 && { visibility: "hidden" }}
              w={"100%"}
              value={percentage}
              color={progressColor}
            />
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
            item.title === "Cartão" && paymentMethod === "Cartão" && !isMobile
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
              {isMobile ? (
                <Modal
                  opened={creditCardModal}
                  onClose={() => setCreditCardModal(false)}
                  centered
                >
                  <Flex gap={"md"} direction={"column"}>
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
                        {...credit_form.getInputProps("number")}
                        w={"100%"}
                      >
                        {(inputProps) => (
                          <TextInput
                            {...inputProps}
                            type="text"
                            name="number"
                            placeholder="Número do cartão"
                            {...credit_form.getInputProps("number")}
                          />
                        )}
                      </ReactInputMask>
                      <TextInput
                        type="text"
                        name="name"
                        placeholder="Seu nome"
                        value={state.name}
                        onChange={handleInputChange}
                        {...credit_form.getInputProps("person_name")}
                        onFocus={handleInputFocus}
                      />
                      <Flex gap={"xs"}>
                        <ReactInputMask
                          mask="99/99"
                          value={state.expiry}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          {...credit_form.getInputProps("expiration_date")}
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
                          {...credit_form.getInputProps("cvc")}
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
                </Modal>
              ) : (
                <Flex gap={"md"}>
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
          )}
        </Flex>
      </Radio.Card>
    </motion.div>
  ));

  const handleSubmit = () => {
    const errors = adress_form.validate();

    if (errors.hasErrors) {
      console.log(errors);
      
      return;
    }

    setFinalizePurchase(true);
    setTimeout(() => {
      if (paymentMethod === "PIX") {
        setPixModal(true);
      } else if (paymentMethod === "Boleto Bancário") {
        setTicketModal(true);
      }
      setFinalizePurchase(false);
    }, 2000);
  };

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
                key={adress_form.key("cep")}
                value={adress_form.values.cep}
                label="CEP"
                rightSection={cepLoading && <Loader size={"xs"} mr={20} />}
                disabled={cepLoading}
                error={adress_form.errors.cep || (cepError && "CEP inválido")}
                maxLength={8}
                onBlur={(e) => {
                  handleCepChange(e.target.value);
                }}
              />
              <TextInput
                label="Estado"
                {...adress_form.getInputProps("state")}
                key={adress_form.key("state")}
                disabled={cepLoading}
                error={adress_form.errors.state}
              />
              <TextInput
                label="Cidade"
                {...adress_form.getInputProps("city")}
                key={adress_form.key("city")}
                disabled={cepLoading}
                error={adress_form.errors.city}
              />
              <TextInput
                label="Rua"
                {...adress_form.getInputProps("street")}
                key={adress_form.key("street")}
                disabled={cepLoading}
                error={adress_form.errors.street}
              />
              <TextInput
                label="Bairro"
                {...adress_form.getInputProps("district")}
                key={adress_form.key("district")}
                disabled={cepLoading}
                error={adress_form.errors.district}
              />
              <TextInput
                label="Número"
                {...adress_form.getInputProps("number")}
                key={adress_form.key("number")}
                disabled={cepLoading}
                error={adress_form.errors.number}
              />
              <TextInput
                label="Complemento"
                {...adress_form.getInputProps("complement")}
                key={adress_form.key("complement")}
                disabled={cepLoading}
                error={adress_form.errors.complement}
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
              loading={FinalizePurchase}
              color="orange"
              onClick={() => {
                adress_form.onSubmit(handleSubmit)();
                setFinishPayment(true);
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
                      <Text size="xs">
                        {product?.map((item) => item?.name).join(", ")}
                      </Text>
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
