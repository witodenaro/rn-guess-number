import GameActionTypes from './game.types';

const initialState = {
  started: false,
};

const gameReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GameActionTypes.START_GAME:
      if (state.started === true) return state;

      return {...state, started: true};

    case GameActionTypes.END_GAME:
      if (state.started === false) return state;

      return {
        ...state,
        started: false,
      };

    default:
      return state;
  }
};

export default gameReducer;
