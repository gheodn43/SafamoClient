import api from './api';

const tagsService = {
    create: async () => {
        try {
            const response = await api.post('/room_tag/create');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    publicGetAll: async () => {
        try {
            const response = await api.get('/auth/room_tag/view');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    publicGetAllSelected: async (tagIds) => {
        try {
            const response = await api.post('/auth/room_tag/view_all_selected',tagIds);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default tagsService;