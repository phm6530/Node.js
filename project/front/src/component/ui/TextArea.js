import styled, { css } from 'styled-components';

// 공통 스타일 컴포넌트
const commonStyle = css`
  padding: 5px 10px;
  border-radius: .5em;
  background: #fdfdfd;
  border: 1px solid #00000014;
  color: #222;
  ${props => props.$error && `border: 1px solid #ffcece;`}
  &::placeholder{
    color:rgba(0,0,0,1);
  }
`;

const InputStyle = styled.input`
  ${commonStyle}
`;

const TextAreaStyle = styled.textarea`
  ${commonStyle}
`;

export {
    InputStyle,
    TextAreaStyle
};
