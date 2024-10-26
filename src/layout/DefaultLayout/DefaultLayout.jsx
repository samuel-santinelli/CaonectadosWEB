import { AppShell, Burger, Group, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./MobileNavbar.module.css";
import DiscountHeaderLayout from "../DiscountHeader/DiscountHeaderLayout";
import HeaderLayout from "../Header/Header";
import Content from "../Content";
import { useHandleNavigate } from "../../services/navigate";

export function DefaultLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { handleNavigate } = useHandleNavigate();

  return (
    <AppShell
      header={{ height: 150 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header style={{ border: 0 }}>
        <DiscountHeaderLayout />
        <HeaderLayout />
        <Group h="100%" px="md" style={{ marginTop: -45, border: 0 }}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="center" style={{ flex: 1 }}>
            {/* <MantineLogo size={30} /> */}
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton
                className={classes.control}
                onClick={() => handleNavigate("/")}
              >
                Home
              </UnstyledButton>
              <UnstyledButton className={classes.control}>
                Cadastro de usuários
              </UnstyledButton>
              <UnstyledButton className={classes.control}>
                Cadastro de produtos
              </UnstyledButton>
              <UnstyledButton className={classes.control}>
                Lista de produtos
              </UnstyledButton>
              <UnstyledButton className={classes.control}>
                Lista de usuários
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton
          className={classes.control}
          onClick={() => handleNavigate("/")}
        >
          Home
        </UnstyledButton>
        <UnstyledButton className={classes.control}>
          Cadastro de usuários
        </UnstyledButton>
        <UnstyledButton className={classes.control}>
          Cadastro de produtos
        </UnstyledButton>
        <UnstyledButton className={classes.control}>
          Lista de produtos
        </UnstyledButton>
        <UnstyledButton className={classes.control}>
          Lista de usuários
        </UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main px={0}>
        <Content />
      </AppShell.Main>
    </AppShell>
  );
}
