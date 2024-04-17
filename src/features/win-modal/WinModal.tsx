import React, { useState } from "react";
import { Input } from "antd";
import { Label } from "./styled";
import { Modal } from "../../shared/modal";

interface Props {
  isOpen: boolean;
  ratio: number;
  clue: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const WinModal = ({ isOpen, setIsModalOpen, ratio, clue }: Props) => {
  const personalScore = localStorage.getItem("lake_monster");
  const lastScore = JSON.parse(personalScore || "{}");

  const [name, nameUpdated] = useState(lastScore.name);

  const addToLocalStorage = () => {
    localStorage.setItem("lake_monster", JSON.stringify({
      name,
      ratio,
      clue
    }));
  };

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWinner = e.currentTarget.value;
    nameUpdated(newWinner);
  };

  return (
    <Modal isOpen={isOpen} setIsModalOpen={setIsModalOpen} handleApply={addToLocalStorage}>
      <Label htmlFor="name">Enter you name</Label>
      <Input id="name" value={name} onChange={handleUpdateName} />
    </Modal>
  );
};
