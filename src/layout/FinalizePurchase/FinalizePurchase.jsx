import DefaultView from "../DefaultView/DefaultView";
import DefaultTitle from "../DefaultTitle/DefaultTitle";
import { product } from "../../models/product";
import {
  Button,
  Card,
  Divider,
  em,
  Flex,
  Group,
  Image,
  Loader,
  Radio,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import { IconBarcode, IconCreditCard } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { formatCEP } from "../../utils/cep-formatter";
import { useNavigate } from "react-router-dom";
import classes from "./FinalizePurchase.module.css"
import { useMediaQuery } from "@mantine/hooks";

const FinalizePurchase = () => {
  const navigate = useNavigate();
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

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

  return (
    <DefaultView>
      {/* <DefaultTitle title="Finalizar pedido" /> */}
      <Flex direction={"row"} gap={"md"} w={"100%"} className={classes.cards_container}>
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
        <Flex direction={"column"} w={"75%"} gap={"md"} className={classes.cards}>
          <Flex justify={"start"}>
            <DefaultTitle title="Forma de pagamento" />
          </Flex>
          <Card withBorder h={120} className={classes.cards_payment_container}>
            <Flex
              w={"100%"}
              justify={"center"}
              align={"center"}
              className={classes.cards_payment_container_v2}
              gap={"md"}
            >
              <Radio.Card w={"100%"} p={10} value="card">
                <Flex align={"center"} justify={"space-between"}>
                  <Group>
                    <Flex direction={"row"} gap={"sm"} align={"center"}>
                      <IconCreditCard color="blue" />
                      <Text>Cartão</Text>
                    </Flex>
                  </Group>
                  <Radio.Indicator />
                </Flex>
              </Radio.Card>

              <Radio.Card w={"100%"} p={10} value="pix">
                <Flex align={"center"} justify={"space-between"}>
                  <Group>
                    <Flex direction={"row"} gap={"sm"} align={"center"}>
                      <Image
                        src={"https://img.icons8.com/color/48/pix.png"}
                        maw={25}
                        h={22}
                      />
                      <Text>PIX</Text>
                    </Flex>
                  </Group>
                  <Radio.Indicator />
                </Flex>
              </Radio.Card>
              <Radio.Card w={"100%"} p={10} value="barcode">
                <Flex align={"center"} justify={"space-between"}>
                  <Group>
                    <Flex direction={"row"} gap={"sm"} align={"center"}>
                      <IconBarcode color="blue" />
                      <Text>Boleto</Text>
                    </Flex>
                  </Group>
                  <Radio.Indicator />
                </Flex>
              </Radio.Card>
            </Flex>
          </Card>
          <Flex justify={"start"} mt={"md"}>
            <DefaultTitle title="Endereço de entrega" />
          </Flex>
          <Card withBorder w>
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
            <Button w={140} h={45} color="orange">
              Continuar
            </Button>
          </Flex>
        </Flex>
        <Flex direction={"column"} w={"70%"} align={"start"} gap={"md"} className={classes.cards} mt={isMobile ? "xl" : ""}>
          <DefaultTitle title={"Resumo da compra"} />
          <Card withBorder w={"100%"}>
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
