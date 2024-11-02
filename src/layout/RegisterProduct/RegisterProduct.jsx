import { ActionIcon, Card, Flex, Image, Text } from "@mantine/core";

import DefaultView from "../DefaultView/DefaultView";
import DefaultTitle from "../DefaultTitle/DefaultTitle";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../services/api";
import DefaultImage from "../../assets/dashboard/products/no-product.jpg";

const RegisterProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        setError("Não foi possível carregar os produtos.");
      }
    };
    fetchProdutos();
  }, []);

  const handleDelete = async (produto) => {
    try {
      await deleteProduct(produto.id, {
        nome: produto.nome,
        status: produto.status,
        descricao: produto.descricao,
        preco: produto.preco,
      });
      setProducts((prevProdutos) =>
        prevProdutos.filter((p) => p.id !== produto.id)
      );
    } catch (error) {      
      setError("No momento não há nenhum produto cadastrado");
    }
  };

  return (
    <DefaultView>
      <Flex justify={"start"} direction={"column"} gap={"md"} w={"100%"}>
        <DefaultTitle title="Produtos Cadastrados" />
        {products.length > 0 ? (
          products.map((item, index) => (
            <Card key={index} withBorder maw={"100%"} mih={100}>
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
                    {item.image ? (
                      <Image src={item?.image} w={100} h={100} />
                    ) : (
                      <Image src={DefaultImage} w={100} h={100} radius={"md"} />
                    )}
                  </Flex>
                  <Flex direction={"column"} gap={5} w={"100%"}>
                    <Flex direction={"row"} justify={"space-between"}>
                      <Text fw={500}>{item?.nome}</Text>
                      <Flex gap={"xs"}>
                        <ActionIcon
                          size={"xl"}
                          radius={"md"}
                          color="red"
                          onClick={() => handleDelete(item.id)}
                        >
                          <IconTrash />
                        </ActionIcon>
                        <ActionIcon size={"xl"} radius={"md"} color="orange">
                          <IconPencil />
                        </ActionIcon>
                      </Flex>
                    </Flex>
                    <Text>{item?.descricao}</Text>

                    <Text fw={500} color="green">{`R$ ${item?.preco}`}</Text>

                    <Flex
                      direction={"row"}
                      justify={"space-between"}
                      align={"center"}
                      w={"100%"}
                    ></Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          ))
        ) : (
          <Text>{error}</Text>
        )}
      </Flex>
    </DefaultView>
  );
};

export default RegisterProduct;
