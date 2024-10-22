import { Flex } from "@mantine/core";

const DefaultView = ({children}) => {
  return (
    <Flex justify={"start"} align={"start"} direction={"column"} p={50} gap={"md"}>
      {children}
    </Flex>
  );
};

export default DefaultView;
