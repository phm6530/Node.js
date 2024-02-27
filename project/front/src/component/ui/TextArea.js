import styled  from 'styled-components';

const InputStyle = styled.input`
    padding: 5px 10px;
    border-radius: .5em;
    background: #f9fafb;
    border: 1px solid #2f2f2f26;
    ${props => props.$error && `border: 1px solid #ffcece;;`}
`

const TextAreaStyle = styled.textarea`
  padding: 5px 10px;
    border-radius: .5em;
    background: #f9fafb;
    border: 1px solid #2f2f2f26;
    ${props => props.$error && `border: 1px solid #ffcece;`}
`



export {
    InputStyle,
    TextAreaStyle
}

