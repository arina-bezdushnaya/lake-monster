import styled from 'styled-components/macro';
import background from '../../assets/images/forest.jpg';
import {color} from '../../theme';

export const StageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${background}) center 60% / cover no-repeat;
  border-radius: 10px;
  box-shadow: 1px 10px 10px ${color.black};
`;
