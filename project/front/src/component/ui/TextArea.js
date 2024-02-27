import styled  from 'styled-components';

const InputStyle = styled.input`
    padding: 5px 10px;
    border-radius: .5em;
    background: #fff;
    border: 1px solid #00000040;
    color: #222;
    ${props => props.$error && `border: 1px solid #ffcece;;`}
`

const TextAreaStyle = styled.textarea`
  padding: 5px 10px;
    border-radius: .5em;
    background: #fff;
    border: 1px solid #00000040;
    color: #222;
    ${props => props.$error && `border: 1px solid #ffcece;`}
`



export {
    InputStyle,
    TextAreaStyle
}

