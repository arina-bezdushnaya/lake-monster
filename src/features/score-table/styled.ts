import styled from "styled-components/macro";

const colors = ["#FFD700", "#C0C0C0", "#b87333"];

const getColor = (value: number) => {
  return colors[value - 1];
};

export const Medal = styled.div<{ value: number }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid ${p => getColor(p.value)};
  background: ${p => getColor(p.value)};
  text-align: center;
  line-height: 18px;
`;

export const NoMedal = styled.div`
  text-align: center;
`;
