import React, { useState } from 'react'; 
import styles from './cadastroUsuario.module.css';
import 'normalize.css';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextInput,
  Button,
  Title,
  Text,
  MantineProvider
} from '@mantine/core';
import InputMask from 'react-input-mask';

function CadastroUsuario() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nome, setNome] = useState('');

  const isPasswordValid = (senha) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/; 
    return regex.test(senha);
  };

  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  const handleCadastrar = (e) => {
    e.preventDefault(); 

    if (!isEmailValid(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    if (!isPasswordValid(senha)) {
      alert('A senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um símbolo.');
      return;
    }

    const usuario = {
      nome,
      email,
      telefone,
      senha,
    };
    navigate('/ListarUsuario', { state: { usuario } });
  };
  
  const handleVerCadastros = () => {
    navigate('/ListarUsuario');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <MantineProvider>
      <div className={styles.wrapper}>
        <div className={styles.background}>
          <img 
            src="https://s3-alpha-sig.figma.com/img/32c1/2208/80826c1858518933bb54159ec6c9a9a8?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DIWfT729ndQ8-67liP2VMr0V1pHzqOuk4e3609w6kIr5SO3Ynyf4KnjQVy-t8AF3S-uIu6aKU66ZL69eBdTlvIDsgm8nB0RnEda9jTp6~kz4SnKlm7~FKH7h-9xHuFXEhhxYSNfHkXOT0VFEvYRTSs3g1cI5YTEZLPaz5M7pHC58FJ1HA0drEUc4OO5Jy~yUyUCTTdz-Lv4FLqJ268O3OVyfqopH-D2maoETznwNh8-Qkcff0f8yUDKpk5JhehMEJhKMlUB~uPsBppcjDpDPvMPXX9413mNzLs-oqgi0ZDliYucjVbr9Qee8O3Q42ABSMOovEzyUSja80MhduNTweA__"
            className={styles.logo} 
          />
          <Text className={styles.titleLogo}>Cãonectados</Text>
        </div>

        <div className={styles.content}>
          <Paper className={styles.form}>
            <Title order={2} className={styles.title} ta="center" mt="md" mb={50}>
              Cadastro
            </Title>
            <TextInput 
              classNames={{ input: styles.input }} 
              placeholder='Nome' 
              value={nome}
              onChange={(e) => setNome(e.currentTarget.value)} 
            />
            <TextInput 
              classNames={{ input: styles.input }} 
              placeholder='Email' 
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)} 
            />
            <InputMask
              mask="(99) 99999-9999" 
              className={styles.input}
              placeholder='Telefone'
              value={telefone}
              onChange={(e) => setTelefone(e.currentTarget.value)} 
            />
            <TextInput 
              classNames={{ input: styles.input }} 
              placeholder='Senha' 
              type='password' 
              value={senha} 
              onChange={(e) => setSenha(e.currentTarget.value)} 
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}> 
              <Button className={styles.buttonCadastro} fullWidth onClick={handleCadastrar}>
                Cadastrar
              </Button>
              <Button className={styles.button} fullWidth onClick={handleVerCadastros}>
                Ver cadastros
              </Button>
              <Button className={styles.button} fullWidth onClick={handleHome}>
                Voltar
              </Button>
            </div>
          </Paper>
        </div>
      </div>
    </MantineProvider>
  );
}

export default CadastroUsuario;
