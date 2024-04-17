import styled from 'styled-components/macro';
import {color} from '../../theme';

const colors = [
  {
    main: '#f9dd39',
    gradient: ['#e79f04', '#f8ac18'],
  },
  {
    main: '#C0C0C0',
    gradient: ['#676767', '#919090'],
  },
  {
    main: '#fcb624',
    gradient: ['#c66f06', '#e17d0b'],
  },
];

const getColor = (value: number) => {
  return colors[value - 1].gradient;
};

const getBgColor = (value: number) => {
  return colors[value - 1].main;
};

export const Medal = styled.div<{value: number}>`
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${p => getBgColor(p.value)};
  text-align: center;
  line-height: 22px;

  ::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 18px;
    height: 18px;
    top: 4px;
    right: 4px;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: linear-gradient(
      -45deg,
      ${p => getColor(p.value)[0]} 0%,
      ${p => getColor(p.value)[0]} 50%,
      ${p => getColor(p.value)[1]} 51%,
      ${p => getColor(p.value)[1]} 100%
    );
    z-index: 111;
  }

  span {
    position: absolute;
    right: 10px;
    top: 2px;
    color: ${color.white};
    font-weight: 600;
    z-index: 11111;
  }
`;

export const NoMedal = styled.div`
  text-align: center;
`;
