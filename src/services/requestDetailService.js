import api from './api';

const requestDetailService = {
  sendLandlordReq: async (user_id, landlordRequest) => {
    try {
      const response = await api.post(`/rental_manage/req_landlord/${user_id.toString()}`, landlordRequest);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  landlordReqDetail: async (request_id) => {
    try {
      const response = await api.get(`/rental_manage/req_landlord/${request_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  acceptLandlordReq: async (user_id) => {
    try {
      const response = await api.post(`/administration/grantAdminRole?user_id=${user_id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default requestDetailService;
