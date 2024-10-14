import { Card, Image } from "@mantine/core";

const PartnerCard = ({ image }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md">
      <Card.Section component="a">
        <Image
          src={image}
          maw={400}
          h={250}
          style={{ backgroundSize: "cover" }}
        />
      </Card.Section>
    </Card>
  );
};

export default PartnerCard;
