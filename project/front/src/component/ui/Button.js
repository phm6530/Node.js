import styled , {css} from 'styled-components';
import { IoMdArrowForward } from "react-icons/io";

const ButtonType = styled.button`
    font-size: 12px;
    background: rgba(0,0,0,0.5);
    color: #fff;
    padding: 5px 10px;
    border-radius: 4em;
`


const ButtonTypeSubmit = styled.button`
    
    display: flex;
    color: #fff;
    border-radius: 5rem;
    cursor: pointer;
    font-size: .8rem;
    justify-content: space-between;
    position: relative;
    align-items: center;
    justify-content: center;
    /* background:linear-gradient(to right, #8d56ef, #4f6494); */
    box-shadow:0 5px 15px 5px rgb(16 16 16 / 14%), inset 0 -2px 0 0 rgb(16 16 16 / 36%); 
    padding-left: 1.5rem;
    background: #000;
    .submit_Icon{
        background: #fff;
        border-radius:100%;
        padding: .6rem;
        margin: .3rem;
        margin-left: 1rem;
        svg{
            font-size:1.4rem;
            color: #000;
        }
    }
    &:hover > .submit_Icon{
        background: red;
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

  const PopupOpenButton = styled.div`
        box-shadow: 0px 15px 15px rgba(0,0,0,0.1);
        padding: 10px 20px;
        border-radius: 5em;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img{
            width: 30px;
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
            <div className="submit_Icon">
                <IoMdArrowForward />
            </div>
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

const Popup = () =>{
    return(
        <PopupOpenButton>
            Guest Book Wirte
            <img src="/img/board/arrow2.png" alt="arrow_2" />
        </PopupOpenButton>

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
Button.Popup = Popup;
Button.ForsquareBtn = ForsquareBtn;