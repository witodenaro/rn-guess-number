import MythicNumberActionTypes from './mythic-number.types';

export const changeMythicNumber = (number) => ({
  type: MythicNumberActionTypes.CHANGE_NUMBER,
  payload: number,
});

export const setGuessAttemps = (attempts) => ({
  type: MythicNumberActionTypes.SET_GUESS_ATTEMPS,
  payload: attempts,
});
