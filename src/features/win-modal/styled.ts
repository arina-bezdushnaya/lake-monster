import styled, {keyframes} from 'styled-components/macro';
import {Modal} from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-header {
    border-radius: 10px;
  }
`;

const blink = keyframes`
50% {
  opacity: 0;
}
`;

export const Title = styled.div`
  padding: 10px;
  font-size: 26px;
  color: #1cbd00;
  animation: ${blink} 1s linear infinite;
`;

export const Label = styled.label`
  display: block;
  padding-bottom: 10px;
`;
