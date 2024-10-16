import { Carousel } from "@mantine/carousel";
import { Flex } from "@mantine/core";
import PromotionCard from "../../../components/cards/PromotionCard/PromotionCard";
import PortionImage from "../../../assets/dashboard/promotion/portion.png";
import DividerTextComponent from "../../../components/divider/DividerText/DividerText";

const PromotionLayout = () => {

  const product = [
    {
      image: PortionImage,
      name: "Ração de cachorro",
      discountPercentage: "10%",
      description: "A Ração Úmida Whiskas Sachê Frango ao Molho para Gatos Filhotes auxilia no desenvolvimento como também no...",
      price: "141,90",
      discountPrice: "131,90"
    },
    {
      image: "https://cdn.iset.io/assets/62344/produtos/1903/ra-o-purina-friskies-petiscos-do-mar-para-gatos-adultos-sabor-peixe-e-frutos-do-mar-1kg.jpg",
      name: "Friskies de gato",
      discountPercentage: "12%",
      description: "A Ração Friskies Gatos Adultos Peixe e Frutos do Mar é um alimento seco para gatos que contém 42 nutrientes...",
      price: "124,90",
      discountPrice: "113,43"
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5_Zdo0MSGA9xsFIS3kJIcU6qUuzK7P9KZkg&s",
      name: "Ração Gran Plus Choice",
      discountPercentage: "13%",
      description: "A GranPlus Choice para Gatos sabor Frango e Carne  é um alimento completo e equilibrado, que proporciona...",
      price: "164,90",
      discountPrice: "153,29"
    },
    {
      image: "https://images.tcdn.com.br/img/img_prod/838319/racao_special_cat_gatos_castrados_1783_1_66efa2ba353803dec7e2baa3190cf16f_20230223124840.jpg",
      name: "Ração Special Cat Gatos Castrados",
      discountPercentage: "13%",
      description: "Elaborada pensando na saúde e bem-estar do seu pet, sua fórmula não possui corantes...",
      price: "105,61",
      discountPrice: "93,74"
    },
    {
      image: "https://cobasi.vteximg.com.br/arquivos/ids/823404/racao-golden-gatos-filhotes-sabor-frango-1kg.jpg?v=638126878533430000",
      name: "Ração Golden Gatos Filhotes Sabor Frango 1 kg",
      discountPercentage: "13%",
      description: "Elaborada pensando na saúde e bem-estar do seu pet, sua fórmula não possui corantes...",
      price: "105,61",
      discountPrice: "93,74"
    },
    {
      image: "https://agrosolo.fbitsstatic.net/img/p/racao-spert-cat-premium-para-gatos-sabor-frango-e-salmao-84687/280177-1.jpg?w=700&h=700&v=no-value",
      name: "Ração Spert Cat Premium para Gatos Sabor Frango e Salmão",
      discountPercentage: "10%",
      description: "Elaborada pensando na saúde e bem-estar do seu pet, sua fórmula não possui corantes...",
      price: "264,61",
      discountPrice: "234,61"
    },
    {
      image: "https://m.media-amazon.com/images/I/51Xm1wnAL0L._AC_UF1000,1000_QL80_.jpg",
      name: "Ração Pegada Essencial para Gatos Adultos e Filhotes Sabor Mix de Carne 10,1kg",
      discountPercentage: "10%",
      description: "Elaborada pensando na saúde e bem-estar do seu pet, sua fórmula não possui corantes...",
      price: "113,25",
      discountPrice: "103,25"
    },
    {
      image: "https://www.balance.com.br/assets/images/produtos/gatos/adulto-castrado/mkp_balance_gato_frango_3kg_castrado_571.jpg",
      name: "Ração Seca para Gatos",
      discountPercentage: "35%",
      description: "Elaborada pensando na saúde e bem-estar do seu pet, sua fórmula não possui corantes...",
      price: "200,99",
      discountPrice: "157,25"
    },
  ]

  function shuffleProduct(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Pega um índice aleatório
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos
    }
    return arr;
  }

  return (
    <Flex direction={"column"} gap={30} px={50}>
      <DividerTextComponent        
        title="POPULARES"        
      />
      <Carousel
        slideSize={{ base: "100%", sm: "50%", md: "28%"}}
        withIndicators={false}
        withControls={true}
        align="start"
        slidesToScroll={4}
        controlSize={50}
      >
        {shuffleProduct(product).map((item, index) => (
          <Carousel.Slide key={index}>
            <PromotionCard
              index={index}
              image={item.image}
              name={item.name}
              discountPercentage={item.discountPercentage}
              description={item.description}
              price={item.price}
              discountPrice={item.discountPrice}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Flex>
  );
};

export default PromotionLayout;
