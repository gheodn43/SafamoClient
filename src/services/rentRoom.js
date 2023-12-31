import api from './api';

const RentRoomService = {
  getAllRentRooms: async () => {
    try {
      const response = await api.get('/GetAllRentRooms');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  joinRoom: async (rentRoomData) => {
    try {
      const response = await api.post('/rentRoom/joinRoom', rentRoomData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  joinRoomWithDependent: async (rentRoom_id) => {
    try {
      const response = await api.post(`/rentRoom/joinRoomWithDependent?rentRoom_id=${rentRoom_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyRoomsRented: async () => {
    try {
      const response = await api.get('/MyRoomRented');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyRoomRentedDetail: async (room_id) => {
    try {
      const response = await api.get(`/MyRoomRentedDetail?room_id=${room_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRentRooms: async (room_id) => {
    try {
      const response = await api.get(`/getRentRooms?room_id=${room_id.toString()}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // getOne: async (room_id) => {
  //   try {
  //     const response = await api.get(`/getRentRoom?room_id=${room_id.toString()}`);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },
};

export default RentRoomService;
