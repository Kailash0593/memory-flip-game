import React from 'react';
import { Game } from './components/Game';
import { GameProvider } from '../../contexts/GameContext';

export const PlayGame = () => {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  )
}
