
import api from './api';

const userService = {
  getMYProfile: async () => {
    try {
      const response = await api.get('/user-profile/view_my_profile'); 
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserInfo: async (userId) => {
    try {
      const response = await api.get(`/user-profile?userId=${userId.toString()}`); 
      return response.data;
    } catch (error) {
      throw error;
    }
  },

};

export default userService;
