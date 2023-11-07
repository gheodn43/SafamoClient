import api from './api';

const ContractService = {

  generateContract: async (rentRoomInfo) => {
    try {
      const response = await api.post('/contract/generate',rentRoomInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default ContractService;
