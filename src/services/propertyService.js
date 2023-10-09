import api from './api';

const propertyService = {
    create: async (propertyInfo) => {
        try {
            const response = await api.post('/properties/create', propertyInfo);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllMyProperties: async () => {
        try {
            const response = await api.get('/properties/my_properties');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
      
};

export default propertyService;