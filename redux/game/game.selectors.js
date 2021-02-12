import {createSelector} from 'reselect';

const selectGame = (state) => state.game;

export const selectGameStarted = createSelector(
  selectGame,
  (game) => game.started,
);
