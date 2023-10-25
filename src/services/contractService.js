import api from './api';

const ContractService = {

  generateContract: async (rentRoom_id, rentRoomInfo) => {
    try {
      const response = await api.post(`/contract/generate?rentRoom_id=${rentRoom_id.toString()}`, rentRoomInfo);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default ContractService;
