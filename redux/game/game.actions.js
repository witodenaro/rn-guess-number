import GameActionTypes from './game.types';

export const startGame = () => ({
  type: GameActionTypes.START_GAME,
});

export const endGame = () => ({
  type: GameActionTypes.END_GAME,
});

export const resetGame = () => ({
  type: GameActionTypes.RESET_GAME,
});
