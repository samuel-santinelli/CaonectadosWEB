import { MantineProvider, Container, Text, Button, TextInput } from '@mantine/core';
import { HeaderSearch } from '../Header/HeaderSearch'; // Importando o componente de header
import editarClasses from './EditarUsuarios.module.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditarUsuario() {
  const navigate = useNavigate();
  const location = useLocation();
  
  
  const { usuario } = location.state || {};
  const { nome: nomeInicial, email: emailInicial, telefone: telefoneInicial, senha: senhaInicial } = usuario || {};

  const [nome, setNome] = useState(nomeInicial || '');
  const [email, setEmail] = useState(emailInicial || '');
  const [telefone, setTelefone] = useState(telefoneInicial || '');
  const [senha, setSenha] = useState(senhaInicial || '');

  const handleSalvar = () => {
    const usuarioAtualizado = { nome, email, telefone, senha };

    console.log('Usuário atualizado:', usuarioAtualizado);
   
    

    navigate('/ListarUsuario', { state: { usuario: usuarioAtualizado } }); 
  };

  const handleVoltar = () => {
    navigate('/ListarUsuario', { state: { usuario: { nome, email, telefone, senha } } });
  };

  return (
    <MantineProvider>
      <HeaderSearch />

      <Container className={editarClasses.container}>
        <Text className={editarClasses.title}>Editar Usuário</Text>
        <div className={editarClasses.usuario}>
          <div className={editarClasses.dadosUsuario}>
            <Text className={editarClasses.textLabel}>Nome:</Text>
            <TextInput
              value={nome}
              onChange={(e) => setNome(e.currentTarget.value)} 
              className={editarClasses.textInput} 
            />
            <Text className={editarClasses.textLabel}>E-mail:</Text>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className={editarClasses.textInput} 
            />
            <Text className={editarClasses.textLabel}>Telefone:</Text>
            <TextInput
              value={telefone}
              onChange={(e) => setTelefone(e.currentTarget.value)} 
              className={editarClasses.textInput} 
            />
            <Text className={editarClasses.textLabel}>Senha:</Text>
            <TextInput
              value={senha}
              onChange={(e) => setSenha(e.currentTarget.value)} 
              type="password"
              className={`${editarClasses.textInput} ${editarClasses.textInputSenha}`} 
            />
          </div>
          <div className={editarClasses.buttonContainer}>
            <Button className={editarClasses.salvar} onClick={handleSalvar}>Salvar</Button>
            <Button className={editarClasses.voltar} onClick={handleVoltar}>Voltar</Button>
          </div>
        </div>
      </Container>
    </MantineProvider>
  );
}

export default EditarUsuario;
