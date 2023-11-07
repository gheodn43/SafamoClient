// slices/rentRoomSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contractCreationDate: '',
  contractEndDate: '',
  durationTime: '',
  room_id: 0,
  partyA_id: 0,
  partyB_id: 0
};

const rentRoomSlice = createSlice({
  name: 'rentRoom',
  initialState,
  reducers: {
    setContractCreationDate: (state, action) => {
      state.contractCreationDate = action.payload;
    },
    setContractEndDate: (state, action) => {
      state.contractEndDate = action.payload;
    },
    setDurationTime: (state, action) => {
      state.durationTime = action.payload;
    },
    setRoomId: (state, action) => {
      state.room_id = action.payload;
    },
    setPartyAId: (state, action) => {
      state.partyA_id = action.payload;
    },
    setPartyBId: (state, action) => {
      state.partyB_id = action.payload;
    },
    resetRentRoom: (state) => {
      return initialState;
    }
  }
});

export const {
  setContractCreationDate,
  setContractEndDate,
  setDurationTime,
  setRoomId,
  setPartyAId,
  setPartyBId,
  resetRentRoom
} = rentRoomSlice.actions;

export default rentRoomSlice.reducer;
