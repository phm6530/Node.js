import styled , {css}from 'styled-components';

const ButtonType = styled.button`
    font-size: 12px;
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4em;
`
const ButtonTypeSubmit = styled.button`
    height: 50px;
    display: flex;
    color: #fff;
    border-radius: 1em;
    padding: 0 2rem;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    align-items: center;
    justify-content: center;
    background:linear-gradient(to right, #8d56ef, #4f6494);
    box-shadow:0 5px 15px 5px rgb(16 16 16 / 14%), inset 0 -2px 0 0 rgb(16 16 16 / 36%); 
    ${props => props.$page && 
        css` 
        box-shadow:3px 21px 17px rgb(0 0 0 / 20%);  
        `
    }

    
    &:active{
        box-shadow:0 5px 15px 5px rgb(16 16 16 / 24%), inset 0 -2px 5px 0 rgb(16 16 16 / 56%); 
    }
    &:disabled{
        opacity: .5;
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

const Submit = ({children ,  disabled , ...props})=>{
    return(
        <ButtonTypeSubmit 
            // $page={page}
            disabled={disabled} 
            {...props}
        >
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
