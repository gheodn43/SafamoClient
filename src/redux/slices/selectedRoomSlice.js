// slices/selectedRoomSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  imageUrls: [],
  roomName: '',
  tags: [],
  price: 0,
  room_id: '',
  ratingStar: 0
};

const selectedRoomSlice = createSlice({
  name: 'selectedRoom',
  initialState,
  reducers: {
    setImageUrls: (state, action) => {
      state.imageUrls = action.payload;
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setRoomId: (state, action) => {
      state.room_id = action.payload;
    },
    setRatingStar: (state, action) => {
      state.ratingStar = action.payload;
    },
    resetSelectedRoom: (state) => {
      return initialState;
    }
  }
});

export const {
  setImageUrls,
  setRoomName,
  setTags,
  setPrice,
  setRoomId,
  setRatingStar,
  resetSelectedRoom
} = selectedRoomSlice.actions;

export default selectedRoomSlice.reducer;
