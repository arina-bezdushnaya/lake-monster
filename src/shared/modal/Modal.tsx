import React from "react";
import { Title, StyledModal } from "./styled";

interface Props {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
  title?: string;
  handleApply?: () => void;
}

export const Modal = ({
                        children,
                        isOpen,
                        setIsModalOpen,
                        title = "You win !!!",
                        handleApply = () => {
                        }
                      }: Props) => {
  const handleOk = () => {
    handleApply();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <StyledModal
      title={<Title>{title}</Title>}
      visible={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Сохранить"
      cancelText="Отмена"
    >
      {children}
    </StyledModal>
  );
};
