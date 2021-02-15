import {create} from 'react-test-renderer';
import {createStore} from 'redux';
import {createSelector} from 'reselect';

const selectMythicNumber = (state) => state.mythicNumber;

export const selectMythicNumberValue = createSelector(
  selectMythicNumber,
  (mythicNumber) => mythicNumber.value,
);

export const selectGuessAttempsCount = createSelector(
  selectMythicNumber,
  (mythicNumber) => mythicNumber.guessAttempts,
);
