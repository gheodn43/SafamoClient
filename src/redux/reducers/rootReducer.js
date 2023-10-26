import { combineReducers } from 'redux';
import roomRentalStatusReducer from '../slices/roomRentalStatusSlice';
import rentRoomSlice from '../slices/rentRoomSlice';
import selectedRoomSlice from '../slices/selectedRoomSlice';


const rootReducer = combineReducers({
  roomRentalStatus: roomRentalStatusReducer,
  rentRoom: rentRoomSlice,
  selectedRoom: selectedRoomSlice,
});

export default rootReducer;
