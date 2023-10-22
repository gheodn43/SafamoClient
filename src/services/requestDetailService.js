import api from './api';

const requestDetailService = {
  requestsForAdmin: async () => {
    try {
      const response = await api.get('/rental_manage/requests/list');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  requestsForSender: async () => {
    try {
      const response = await api.post('/rental_manage/request/get_all');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  sendLandlordReq: async (user_id, landlordRequest) => {
    try {
      const response = await api.post(`/rental_manage/req_landlord/${user_id.toString()}`, landlordRequest);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  sendRentaldReq: async (user_id, room_id) => {
    try {
      const response = await api.post(`/rental_manage/req_rental/send?user_id=${user_id.toString()}&room_id=${room_id.toString()}`);
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

  acceptRentalReq: async (request_id, contractLink) => {
    try {
      const response = await api.post(`/rental_manage/req_rental/accept?requestId=${request_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  rejectRentalReq: async (request_id) => {
    try {
      const response = await api.post(`/rental_manage/req_rental/reject?requestId=${request_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  
};

export default requestDetailService;
