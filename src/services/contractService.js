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

  PreviewContract: async (user_id, room_id) => {
    try {
      const response = await api.get(`/contract/get?user_id=${user_id}&room_id=${room_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};
export default ContractService;
