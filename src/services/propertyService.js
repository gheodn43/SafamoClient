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

    getAllProperties: async () => {
        try {
            const response = await api.get('/properties/view_all');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    adminGetOneProperty: async (request_id) => {
        try {
            const response = await api.get(`/properties/${request_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    CustomerGetOneProperty: async (request_id) => {
        try {
            const response = await api.get(`/properties/preview/${request_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    adminDenieProperty: async (request_id) => {
        try {
            const response = await api.post(`/properties/denie/${request_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
      
    adminAcceptProperty: async (request_id) => {
        try {
            const response = await api.post(`/properties/accept/${request_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    adminBlockProperty: async (request_id) => {
        try {
            const response = await api.post(`/properties/block/${request_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    adminUnblockProperty: async (request_id) => {
        try {
            const response = await api.post(`/properties/unblock/${request_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    customerEditProperty: async (request_id) => {
        try {
            const response = await api.post(`/properties/edit/${request_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getLandlord: async (property_id) => {
        try {
            const response = await api.get(`/properties/getOwner/${property_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default propertyService;