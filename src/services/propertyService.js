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
            // Gửi yêu cầu GET đến API để lấy danh sách tài sản của người dùng
            const response = await api.get('/properties/my_properties');
            // Xử lý dữ liệu trả về 
            return response.data;
        } catch (error) {
            throw error;
        }
    },
      
};

export default propertyService;