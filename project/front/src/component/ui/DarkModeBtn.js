import styled from 'styled-components'

const DarkmodeButton = styled.div`
    border-radius: 1em;
    background: transparent;
    border: 0;
    background: #000;
    color: #fff;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 3px 6px;
    cursor: pointer;
    width: 50px;
    height: 20px;
    border: 2px solid #000;
    border: 2px solid #fff;
    box-shadow: 0px 5px 15px rgba(0,0,0,.3);
    &:active{
        background-color: #c5c5c5;
    }

    &::after{
        content: "";
        transition: all .7s cubic-bezier(0.14, 1.03, 0.23, 0.96);
        background: red;
        width: 28px;
        height: 28px;
        top: 50%;
        transform: translate(-50% , -50%);
        display: block;
        border-radius: 100%;
        position: absolute;
        
        ${props => props.$darkMode 
            ? `
                left: 14px;
                background-color: #000;
            ` 
            : `
                left: calc(100% - 13px);
                background-color: #fff;
            ` 
        }
    }

    ${props => props.$darkMode && `
        background:#fff;
        color:#000; 

    `}
`

export default function DarkModeBtn({children, ...props}){
    return(
        <DarkmodeButton {...props}>
            {children}
        </DarkmodeButton>
    )
}