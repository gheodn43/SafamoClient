import { combineReducers } from 'redux';
import roomRentalStatusReducer from '../slices/roomRentalStatusSlice';
import rentRoomSlice from '../slices/rentRoomSlice';
import selectedRoomSlice from '../slices/selectedRoomSlice';
import userProfileSlice from '../slices/userProfileSlice';


const rootReducer = combineReducers({
  roomRentalStatus: roomRentalStatusReducer,
  rentRoom: rentRoomSlice,
  selectedRoom: selectedRoomSlice,
  userProfile: userProfileSlice,
});

export default rootReducer;
