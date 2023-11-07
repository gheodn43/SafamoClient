import { combineReducers } from 'redux';
import roomRentalStatusReducer from '../slices/roomRentalStatusSlice';
import rentRoomSlice from '../slices/rentRoomSlice';


const rootReducer = combineReducers({
  roomRentalStatus: roomRentalStatusReducer,
  rentRoom: rentRoomSlice,

});

export default rootReducer;
