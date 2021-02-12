import {createStore} from 'redux';
import {createSelector} from 'reselect';

const selectMythicNumber = (state) => state.mythicNumber;

export const selectMythicNumberValue = createSelector(
  selectMythicNumber,
  (mythicNumber) => mythicNumber.value,
);
