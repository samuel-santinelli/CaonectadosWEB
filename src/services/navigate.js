import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

export function useHandleNavigate() {  
  const [opened, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    toggle(); // Alterna o estado de 'opened'        
    navigate(route); // Navega para a rota especificada
  };

  return { handleNavigate, opened };
}
