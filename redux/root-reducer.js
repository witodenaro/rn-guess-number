import {combineReducers} from 'redux';

import mythicNumberReducer from './mythic-number/mythic-number.reducer';
import gameReducer from './game/game.reducer';

export default combineReducers({
  mythicNumber: mythicNumberReducer,
  game: gameReducer,
});
