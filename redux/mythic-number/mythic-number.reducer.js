import MythicNumberActionTypes from './mythic-number.types';

const initialState = {
  value: null,
  guessAttempts: 0,
};

const mythicReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case MythicNumberActionTypes.CHANGE_NUMBER:
      if (payload === state.value) return state;

      return {...state, value: payload};

    case MythicNumberActionTypes.SET_GUESS_ATTEMPS:
      if (payload === state.value) return state;

      return {...state, guessAttempts: payload};

    default:
      return state;
  }
};

export default mythicReducer;
