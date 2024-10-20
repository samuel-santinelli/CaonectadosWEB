import React, { useState } from 'react';
import { MantineProvider, Container, Text, Button, TextInput } from '@mantine/core';
import listarClasses from './ListarUsuarios.module.css';
import { HeaderSearch } from '../Header/HeaderSearch'; 
import { useLocation, useNavigate } from 'react-router-dom';


interface Usuario {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

function ListarUsuario() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialUsuario: Usuario | null = location.state?.usuario || null;

  
  const [usuarios, setUsuarios] = useState<Usuario[]>(initialUsuario ? [initialUsuario] : []); 


  const handleEditClick = (usuario: Usuario) => {
    navigate('/EditarUsuario', { state: { usuario } });
  };


  const handleDelete = (usuarioToDelete: Usuario) => {
    setUsuarios((prevUsuarios) => prevUsuarios.filter(usuario => usuario.email !== usuarioToDelete.email));
  };

  return (
    <MantineProvider>
      <HeaderSearch />
      <Container className={listarClasses.container}>
        <Text className={listarClasses.title}>Usuários Cadastrados</Text>

        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <div key={usuario.email} className={listarClasses.usuario}>
              <div className={listarClasses.dadosUsuario}>
                <Text className={listarClasses.textLabel}>Nome:</Text>
                <TextInput
                  value={usuario.nome}
                  readOnly
                  className={listarClasses.textInput} 
                />
                <Text className={listarClasses.textLabel}>E-mail:</Text>
                <TextInput
                  value={usuario.email}
                  readOnly
                  className={listarClasses.textInput} 
                />
                <Text className={listarClasses.textLabel}>Telefone:</Text>
                <TextInput
                  value={usuario.telefone}
                  readOnly
                  className={listarClasses.textInput} 
                />
                <Text className={listarClasses.textLabel}>Senha:</Text>
                <TextInput
                  value={usuario.senha}
                  readOnly
                  type="password"
                  className={`${listarClasses.textInput} ${listarClasses.textInputSenha}`} 
                />
              </div>
              <div className={listarClasses.buttonContainer}>
                <Button 
                  className={listarClasses.excluir} 
                  onClick={() => handleDelete(usuario)} // Chama a função de deletar
                >
                  Excluir
                </Button>
                <Button 
                  className={listarClasses.editar} 
                  onClick={() => handleEditClick(usuario)}
                >
                  Editar
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Text>Nenhum usuário encontrado.</Text> // Mensagem caso não haja usuários
        )}
      </Container>
    </MantineProvider>
  );
}

export default ListarUsuario;
