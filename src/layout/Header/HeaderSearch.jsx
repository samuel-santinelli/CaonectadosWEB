// HeaderSearch.tsx

import React from 'react';
import { Autocomplete, Group, Burger, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom'; // Importando NavLink
import headerClasses from './HeaderSearch.module.css';
import { MantineLogo } from '@mantinex/mantine-logo';

// Definindo os links do header
const links = [
  { link: '/about', label: 'Home' },
  { link: '/CadastroUsuario', label: 'Cadastrar Usuários' },
  { link: '/learn', label: 'Cadastros de Produtos' },
  { link: '/community', label: 'Listar Produtos' },
  { link: '/ListarUsuario', label: 'Listar Usuários' },
];

export function HeaderSearch() {
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={({ isActive }) => `${headerClasses.link} ${isActive ? headerClasses.activeLink : ''}`} // Adicionando classe ativa
    >
      {link.label}
    </NavLink>
  ));

  return (
    <header className={headerClasses.header}>
      <div className={headerClasses.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <MantineLogo size={28} />
        </Group>

        <Group>
          <div className={headerClasses.superior}>
            <img
              src="https://s3-alpha-sig.figma.com/img/32c1/2208/80826c1858518933bb54159ec6c9a9a8?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DIWfT729ndQ8-67liP2VMr0V1pHzqOuk4e3609w6kIr5SO3Ynyf4KnjQVy-t8AF3S-uIu6aKU66ZL69eBdTlvIDsgm8nB0RnEda9jTp6~kz4SnKlm7~FKH7h-9xHuFXEhhxYSNfHkXOT0VFEvYRTSs3g1cI5YTEZLPaz5M7pHC58FJ1HA0drEUc4OO5Jy~yUyUCTTdz-Lv4FLqJ268O3OVyfqopH-D2maoETznwNh8-Qkcff0f8yUDKpk5JhehMEJhKMlUB~uPsBppcjDpDPvMPXX9413mNzLs-oqgi0ZDliYucjVbr9Qee8O3Q42ABSMOovEzyUSja80MhduNTweA__"
              className={headerClasses.logo}
            />
            <Text className={headerClasses.titleLogo}>Cãonectados</Text>
            <Autocomplete
              className={headerClasses.search}
              placeholder="O que você esta buscando?"
              rightSection={<IconSearch className={headerClasses.searchIcon} />}
              data={['Home', 'Cadastrar Usuários', 'Cadastros de Produtos', 'Listar Produtos', 'Listar Usuário']}
              classNames={{
                dropdown: headerClasses.dropdown, // Aplica a classe personalizada para o dropdown
              }}
              visibleFrom="xs"
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/7333/f773/029c3b9398c48e5eed4fde1c65f79bac?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WVfLfH08ieG8ghQuhcTKknxFjPLcYnK0OprG3pH-AL2OoqJPqwQkk0ySiGuE3nkpm9MB4kptsLMcCnt3c-pdsT1KOB1HjLfXx0C9oYC82mQhXSw6DM7uRbN-aMHQr4rZj72w0sSc42fDHUSwlbARuxtV46iea2ka-mZC~RqKeGqqEetQMWb9h6AY7GpimFHVYDiSZSLhld~sS-IR0eTyFdBwkfqDDlfUUDv8MpuVaaVSRYbmEAQW6WoT3UZ6Cj3Ou6WXUbYU2ti8Xchm3~ULwzox1hzlifkqVCcGP~WUaq~lsjRschE~-B8W4vWmKuftlcd8GX~sbIRsRU6jETApQw__"
              className={headerClasses.icons}
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/5d47/538f/77b5268e92736ba68c987614eb45c3fa?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UlRbqTWrHZSgwnKkwN7ME2KtDw5oagCI2DZNruBIHzWnefZfLCcb75LTRxUypW14LGlZHuxj3rzubpySWiv8kB8OjM2Jxk2UgDcURSEdJ2XvJVWsDZwzZkW8dXOtUQ-wnIm5mdwfksTVM2P-0rXlV6lMGc103vpqTnRu-0MSwi1u7EDZvWzbayUV3YyT4A0fdv~kjoooF6BGbjKn1GXQeKQ8EfLUEvigrD12lX06JLaqCXMamcxm9nsS~reqvHN~1TYyEfB19xdXlD1ERibUmWX6AJMOMw6-0Q-lSKZpDCYxE~JInR45dF9ikANxgimwQLDQ2j2oGCCqRwS5Eh4UVg__"
              className={headerClasses.icons}
            />
            <img
              src="https://s3-alpha-sig.figma.com/img/5e46/691f/165750279436a809d9831ef7cc61d504?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lBmIJcBO9OfKEwWf2MN8-qZZmWBJ2UpTOmelQE1A~F1qncsJL84JkazGwI2LJuo4r4fJpdqQXmD1K0kM6pHtT6OvBenZtn7GYSWM4LaW7SKDU72LozVOq0NhOeFFREWBUcGeFjnC~Nonv~WAM-aamQ4WPzfrEooSmpOwTQ1POmVNAloI3D-USE~xwGks1gd54hmFrbw-VDLQjcMySFAR8n5l~2XJS-KBGbM9cU3FlEccI-nRNqptl-U8e-2O-F9IVcjyyjlDcnVYrGKInaJ9rT~kb~p-0oVX~z-I1nTrZjannrW~DMdJQenBDTzyJ4gqpL8XvL8jgOxxxaLA-MDFYg__"
              className={headerClasses.icons}
            />
          </div>
          <Group ml={50} gap={5} className={headerClasses.links} visibleFrom="sm">
            {items}
          </Group>
        </Group>
      </div>
    </header>
  );
}
