import React from 'react';
import {Input} from 'antd';
import {Label} from './styled';
import {Modal} from '../../shared/modal';

interface Props {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const WinModal = ({isOpen, setIsModalOpen}: Props) => {
  return (
    <Modal isOpen={isOpen} setIsModalOpen={setIsModalOpen}>
      <Label htmlFor="name">Enter you name</Label>
      <Input id="name" onChange={e => console.log(e.currentTarget.value)} />
    </Modal>
  );
};
