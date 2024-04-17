import React from "react";
import {
  CurrentSpeed,
  ControlContainer,
  Problem,
  ClueCheckbox,
  Clue,
  ClueLabel,
  Result
} from "./styled";
import { WinModal } from "../win-modal";
import { ScoreTable } from "../score-table";

interface Props {
  whoWin: string;
  speed: number;
  isShowClue: boolean;
  isModalOpen: boolean;
  setSpeed: (speed: number) => void;
  toggleClue: (isShown: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const Control = (props: Props) => {
  const {
    whoWin,
    speed,
    setSpeed,
    isShowClue,
    toggleClue,
    isModalOpen,
    setIsModalOpen
  } = props;

  const handleSpeedChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.currentTarget.value));
  };

  const handleShowClue = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleClue(e.currentTarget.checked);
  };

  const result = () => {
    switch (whoWin) {
      case "you":
        return <Result youWin>You win!!!</Result>;
      case "wolf":
        return <Result>The Wolf ate you :(</Result>;
      default:
        return <div />;
    }
  };

  return (
    <ControlContainer>
      <Problem>
        The Wolf wants to eat you. You need to escape. If you can touch shore
        even for a moment without the Wolf already being upon you, you win. You
        can set how many times the Wolf moves faster than you.
      </Problem>

      <CurrentSpeed>Speed ratio: {speed}</CurrentSpeed>
      <input
        type="range"
        max={4}
        min={1}
        defaultValue={speed}
        onChange={handleSpeedChanged}
        step="0.1"
      />
      <br />

      <Clue>
        <ClueCheckbox
          type="checkbox"
          id="clue"
          checked={isShowClue}
          onChange={handleShowClue}
        />
        <ClueLabel htmlFor="clue">Show clue</ClueLabel>
      </Clue>

      {result()}

      <ScoreTable />

      <WinModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} ratio={speed} clue={isShowClue} />
    </ControlContainer>
  );
};
