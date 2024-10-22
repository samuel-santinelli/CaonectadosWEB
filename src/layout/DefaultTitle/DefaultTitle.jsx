import { Text } from "@mantine/core";

const DefaultTitle = ({ title }) => {
  return (
    <Text fw={600} size="md">
      {title}
    </Text>
  );
};

export default DefaultTitle;
