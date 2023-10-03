import api from './api';

const apiGetListService = {
    rentalRequestsForAdmin: async () => {
        try {
          const response = await api.get('/rental_manage/requests/list');
          return response.data;
        } catch (error) {
          throw error;
        }
      },
};

export default apiGetListService;