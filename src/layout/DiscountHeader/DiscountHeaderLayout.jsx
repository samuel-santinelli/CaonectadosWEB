import { Flex, Text } from "@mantine/core"
import classes from "./DiscountHeaderLayout.module.css"

const DiscountHeaderLayout = () => {
    return (
        <Flex className={classes.control}>
            <Text>CUPOM DE 10% DE DESCONTO USANDO #PETCONECTADO</Text>
        </Flex>
    )
}

export default DiscountHeaderLayout;