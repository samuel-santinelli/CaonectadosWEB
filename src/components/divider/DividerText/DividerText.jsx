import { Divider } from "@mantine/core";

const DividerTextComponent = ({title}) => {
  return (
    <Divider
      my="xs"
      label={title}
      labelPosition="center"
      flex={1}
      px={20}
    />
  );
};

export default DividerTextComponent;
