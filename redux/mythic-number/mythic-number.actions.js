import MythicNumberActionTypes from './mythic-number.types';

export const changeMythicNumber = (number) => ({
  type: MythicNumberActionTypes.CHANGE_NUMBER,
  payload: number,
});
