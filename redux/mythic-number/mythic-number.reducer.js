import MythicNumberActionTypes from './mythic-number.types';

const initialState = {
  value: null,
};

const mythicReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case MythicNumberActionTypes.CHANGE_NUMBER:
      if (payload === state.value) return state;

      return {...state, value: payload};

    default:
      return state;
  }
};

export default mythicReducer;
