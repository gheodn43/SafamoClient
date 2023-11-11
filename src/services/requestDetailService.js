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
  requestsForLandlord: async () => {
    try {
      const response = await api.get('/rental_manage/req_rentals');
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

  sendRentaldReq: async (user_id, room_id, duarationTime) => {
    try {
      const response = await api.post(`/rental_manage/req_rental/send?user_id=${user_id.toString()}&room_id=${room_id.toString()}&duarationTime=${duarationTime}`);
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
  rejectLandlordReq: async (request_id) => {
    try {
      const response = await api.post(`/rental_manage/req_landlord/reject?requestId=${request_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  acceptLandlordReq: async (request_id) => {
    try {
      const response = await api.post(`/rental_manage/req_landlord/accept?requestId=${request_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  grandLandlordReq: async (user_id) => {
    try {
      const response = await api.post(`/administration/grantAdminRole?user_id=${user_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  acceptRentalReq: async (request_id) => {
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
  getOneRentalReq: async (request_id) => {
    try {
      const response = await api.get(`/rental_manage/view?requestId=${request_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyRentalReq: async (request_id) => {
    try {
      const response = await api.get(`/rental_manage/viewMyRequest?requestId=${request_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRentalReq: async (roomId) => {
    try {
      const response = await api.post(`/rental_manage/req_rentals/delete?roomId=${roomId.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletedRentalReq: async (requestId) => {
    try {
      const response = await api.post(`/rental_manage/req_rental/deleted?requestId=${requestId.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRentalReqAfterJoinRoom: async (requestId) => {
    try {
      const response = await api.post(`/rental_manage/req_rental/delete?requestId=${requestId.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  
};

export default requestDetailService;
