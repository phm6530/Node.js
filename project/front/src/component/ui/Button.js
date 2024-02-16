import styled from 'styled-components';

const ButtonType = styled.button`
    font-size: 12px;
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4em;
`

const Type = ({children , ...props}) =>{
    return(
        <ButtonType {...props}>{children}</ButtonType>
    )
}

export function Button({children}){
    return(
        <button>
            {children}
        </button>
    )
}

Button.Type = Type;

