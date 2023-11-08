import api from './api';

const adminService = {
    getRequestTypes: async () => {
        try {
            const response = await api.get('/auth/request-type');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default adminService;