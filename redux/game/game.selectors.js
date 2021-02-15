import {createSelector} from 'reselect';

const selectGame = (state) => state.game;

export const selectGameStatus = createSelector(
  selectGame,
  (game) => game.status,
);
