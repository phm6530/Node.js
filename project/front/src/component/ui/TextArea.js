import styled from 'styled-components';

const InputStyle = styled.input`
  padding: 5px 10px;
    border-radius: 14px;
    background: #f9fafb;
    border: 1px solid #99999966;
    box-shadow: inset -4px -4px 3px rgb(255 255 255 / 23%), inset 4px 4px 2px rgb(147 147 147 / 13%);
    ${props => props.$error && `border: 1px solid #ff6f6f;`}
`

const TextAreaStyle = styled.textarea`
  padding: 5px 10px;
    border-radius: 14px;
    background: #f9fafb;
    border: 1px solid #99999966;
    box-shadow: inset -4px -4px 3px rgb(255 255 255 / 23%), inset 4px 4px 2px rgb(147 147 147 / 13%);
    ${props => props.$error && `border: 1px solid #ff6f6f;`}
`


export {
    InputStyle,
    TextAreaStyle
}