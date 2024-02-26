import styled , {css}from 'styled-components';

const ButtonType = styled.button`
    font-size: 12px;
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4em;
`
const ButtonTypeSubmit = styled.button`
    width: 150px;
    height: 50px;
    display: flex;
    color: #fff;
    border-radius: 5em;
    font-size: 14px;
    cursor: pointer;
    position: relative;
    align-items: center;
    justify-content: center;
    background:linear-gradient(to right, #4f3974, #20242d);
    ${props => props.$page && 
        css` 
        box-shadow:3px 21px 17px rgb(0 0 0 / 20%);  
        `
    }

    
    &:active{
        box-shadow:3px 21px 17px rgb(0 0 0 / 25%);  
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

const Submit = ({children , page, disabled , ...props})=>{
    return(
        <ButtonTypeSubmit 
            $page={page}
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
