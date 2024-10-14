import { ActionIcon, Flex, Input } from "@mantine/core";
import SystemLogo from "../../assets/logo/Logo.png";
import classes from "./Header.module.css";
import {
  IconCubePlus,
  IconLogout,
  IconSearch,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";

const HeaderLayout = () => {
  return (
    <Flex gap={45} className={classes.control}>
      <Flex>
        <img src={SystemLogo} style={{ width: 200 }} />
      </Flex>
      <Input
        placeholder="O que está buscando?"
        rightSection={<IconSearch style={{ paddingRight: 10}} />}
        rightSectionWidth={30}
        width={200}
        w={500}
      />

      <Flex className={classes.icons}>
        <ActionIcon.Group>
          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Gallery"
            color="black"
            className={classes.actionIcons}
          >
            <IconUser style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Settings"
            color="black"
            className={classes.actionIcons}
          >
            <IconShoppingCart style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Likes"
            color="black"
            className={classes.actionIcons}
          >
            <IconCubePlus style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            size="lg"
            aria-label="Likes"
            color="black"
            className={classes.actionIcons}
          >
            <IconLogout style={{ width: 20 }} stroke={1.5} />
          </ActionIcon>
        </ActionIcon.Group>
      </Flex>
    </Flex>
  );
};

export default HeaderLayout;
