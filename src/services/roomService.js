import api from './api';

const roomService = {
    create: async (property_id,roomInfo) => {
        try {
            const response = await api.post(`/room/create/${property_id.toString()}`, roomInfo);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllRoomOfMyProperty: async (property_id) => {
        try {
            const response = await api.get(`/my_room/get_all/${property_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    addImageIntoRoom: async (room_id, pictureURLs) => {
        try {
            const response = await api.get(`/room/create/add_image/${room_id.toString()}`, pictureURLs);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllRoomIsValid: async () => {
        try {
            const response = await api.get("/auth/rooms");
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    viewDetailRoomIsValid: async (room_id) => {
        try {
            const response = await api.get(`/auth/rooms/${room_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    viewAllRentalRequestForRoom: async (room_id) => {
        try {
            const response = await api.post(`/rental_manage/req_rental/get_all?room_id=${room_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    draftContractForRoom: async (room_id) => {
        try {
            const response = await api.post(`/room/draft-contract/${room_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    findCompound: async (room_id) => {
        try {
            const response = await api.post(`/room/find-compound/${room_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    cancelFindCompound: async (room_id) => {
        try {
            const response = await api.post(`/room/cancel-find-compound/${room_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    changeStatusRoomIsRenting: async (room_id) => {
        try {
            const response = await api.post(`/room/join/${room_id.toString()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default roomService;