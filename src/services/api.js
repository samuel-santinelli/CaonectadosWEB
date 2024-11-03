import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7022/api'
});

export const getProducts = async () => {
  try {
    const response = await api.get('/produto');
    return response.data;
  } catch (error) {    
    throw error;
  }
};

export const deleteProduct = async (id, productData) => {
    try {
      await api.delete(`/produto/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        data: productData
      });
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      throw error;
    }
  };
  

export default api;
