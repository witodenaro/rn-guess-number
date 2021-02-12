import {combineReducers} from 'redux';

import mythicNumberReducer from './mythic-number/mythic-number.reducer';

export default combineReducers({
  mythicNumber: mythicNumberReducer,
});
