import { combineReducers } from 'redux';
import { userReducer } from './user.Reducer';
import { searchReducer } from './search.Reducer';
import { cartReducer } from './cart.Reducer';

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer
});

export default rootReducer;
