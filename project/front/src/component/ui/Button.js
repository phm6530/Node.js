import styled from 'styled-components';

const ButtonType = styled.button`
    font-size: 12px;
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4em;
`
const ButtonTypeSubmit = styled.button`
    background: linear-gradient(to right, #e2e6ef, #c5cde0);
    background: #e5e9f2;
    width: 150px;
    height: 50px;
    display: flex;
    color: #fff;
    border-radius: 5em;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    box-shadow: -4px -4px 20px rgb(255, 255, 255), 4px 4px 17px rgba(36, 36, 36, 0.26);
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #5e6c89, #35373b);
    border: 5px solid rgb(255 255 255 / 77%);
    &:active{
        box-shadow: 3px 1px 17px rgba(255, 255, 255, 0.8), 1px -1px 4px rgba(48, 59, 73, 0.24);
    
    }

  `

  const ForsquareBtnStyle = styled.button`
    border-radius: 2rem;
    font-size: 14px;
    letter-spacing: -.5px;
    padding: 2px 15px;
    border: 2px solid rgba(255,255,255,0.5);
    margin-right: 5px;
    &:hover{
        border: 2px solid rgba(255,255,255,0.7);
        box-shadow: 0px 15px 15px rgba(0,0,0,0.1);
    }
    &:active{
        box-shadow: 0px 15px 15px rgba(0,0,0,0.0);
    }


  `
const Type = ({children , ...props}) =>{
    return(
        <ButtonType {...props}>{children}</ButtonType>
    )
}

const Submit = ({children , ...props})=>{
    return(
        <ButtonTypeSubmit {...props}>
            {children}
        </ButtonTypeSubmit>
    )
}

const ForsquareBtn = ({children , ...props})=>{
    return(
        <ForsquareBtnStyle {...props}>
            {children}
        </ForsquareBtnStyle>
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
Button.Submit = Submit;
Button.ForsquareBtn = ForsquareBtn;
