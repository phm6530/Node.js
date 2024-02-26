import styled , { keyframes } from 'styled-components';

const errorAnimation = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`




const ErrorStyle = styled.div`
        color: #ff1818;
        background: #fff;
        padding: 4px 10px;
        border-radius: 10px;
        position: absolute;
        display: inline-block;
        top: -7px;
        right: 0;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0px 15px 15px rgba(0,0,0,0.2);
        opacity: 0;
        animation: ${errorAnimation} .2s ease forwards;
        &:after{
            position: absolute;
            content: "";
            display: block;
            width: 10px;
            height: 10px;
            bottom: -5px;
            z-index: 0;
            left: 40px;
            background:#fff;
            transform: rotate(45deg);
        }
`



export default function ErrorBubble({children}){

    return(
        <ErrorStyle>
            {children}
        </ErrorStyle>
    )
}