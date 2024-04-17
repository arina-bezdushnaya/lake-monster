import styled, {css} from 'styled-components/macro';
import {color} from '../../theme';

const rangeThumb = css`
  box-shadow: 1px 1px 1px ${color.black}, 0 0 1px #0d0d0d;
  border: 1px solid ${color.black};
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: ${color.white};
  cursor: ew-resize;
`;

const rangeTrack = css`
  width: 100%;
  max-width: 200px;
  height: 8.4px;
  cursor: ew-resize;
  animate: 0.2s;
  box-shadow: 1px 1px 1px ${color.black}, 0 0 1px #0d0d0d;
  background: ${color.primary};
  border-radius: 1.3px;
  border: 0.2px solid #010101;
`;

export const SidebarContainer = styled.div`
  min-width: 350px;
  padding-left: 40px;

  input[type='range'] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
    max-width: 200px;
  }

  input[type='range']:focus {
    outline: none;
  }

  input[type='range']::-webkit-slider-runnable-track {
    ${rangeTrack};
  }

  input[type='range']::-webkit-slider-thumb {
    ${rangeThumb};
    -webkit-appearance: none;
    margin-top: -14px;
  }

  input[type='range']:focus::-webkit-slider-runnable-track,
  input[type='range']:focus::-ms-fill-lower,
  input[type='range']:focus::-ms-fill-upper {
    background: ${color.primary};
  }

  input[type='range']::-moz-range-thumb,
  input[type='range']::-ms-thumb {
    ${rangeThumb};
  }

  input[type='range']::-moz-range-track {
    ${rangeTrack};
  }

  input[type='range']::-ms-track {
    width: 100%;
    max-width: 200px;
    height: 8.4px;
    cursor: ew-resize;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }

  input[type='range']::-ms-fill-lower,
  input[type='range']::-ms-fill-upper {
    background: ${color.primary};
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px ${color.black}, 0 0 1px #0d0d0d;
  }
`;

export const ControlContainer = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
`;

export const SpeedHandle = styled.div`
  width: 50%;
`;

export const TableContainer = styled.div`
  position: absolute;
  top: 300px;
`;

export const CurrentSpeed = styled.div`
  display: flex;
  font-size: 16px;
`;

export const Problem = styled.div`
  display: flex;
  padding: 10px 15px;
  margin-bottom: 25px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  font-size: 14px;
  box-shadow: 1px 10px 10px ${color.black};
`;

export const Clue = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px 0;
`;

export const ClueLabel = styled.label`
  cursor: pointer;
  padding: 0 10px;
`;

export const ClueCheckbox = styled.input`
  width: 20px;
  height: 20px;
  margin-bottom: 0;
  cursor: pointer;
  accent-color: ${color.primary};
`;

export const Result = styled.div<{youWin?: boolean}>`
  padding: 20px 0;
  color: ${p => (!!p.youWin ? '#1cbd00' : 'red')};
  font-size: 24px;
  font-weight: 600;
`;

export const Score = styled.div`
  font-size: 20px;
`;
