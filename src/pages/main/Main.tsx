import React, {useState} from 'react';
import {Lake} from '../../features/lake';
import {GameContainer} from './styled';
import {Control} from '../../features/control';

export const Main = () => {
  const [speed, setSpeed] = useState(2.5);
  const [isShowClue, toggleClue] = useState(false);
  const [whoWin, setWinner] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <GameContainer>
      <Lake
        speed={speed}
        setWinner={setWinner}
        isShowClue={isShowClue}
        setIsModalOpen={setIsModalOpen}
      />

      <Control
        whoWin={whoWin}
        speed={speed}
        setSpeed={setSpeed}
        isShowClue={isShowClue}
        toggleClue={toggleClue}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </GameContainer>
  );
};
