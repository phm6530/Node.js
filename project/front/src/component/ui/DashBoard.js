import { useContext, useEffect } from 'react';
import styled , { css } from 'styled-components';
import {DarkMode} from '../../context/DarkModeContext';


const DashBoardStyle = styled.div`
    width: 100%;
    height: 25rem;
    background-size: cover;
    overflow: hidden;
    z-index: -1;
    background-size: cover;
    transition: background 1.5s ease;
    ${props => {
        switch(props.$page){
            case 'project' :
                    if(props.$DarkMode){
                        return css`background: url(/img/project/bg_darkmode.jpg);`
                    }else{
                        return css`background: url(/img/project/bg.jpg);`
                        // return css`background: linear-gradient(to right, #775ec2, #6672c4);`
                    }
                    case 'board' :
                        if(props.$DarkMode){
                            return css`background: url(/img/project/bg_darkmode.jpg);`
                        }else{
                            // return css`background: linear-gradient(to right, #5c68c8, #669dc4);`
                            return css`background: url(/img/board/bg_board.jpg);`
                        return css`background: linear-gradient(to right, #775ec2, #6672c4);`
                    }
                    case 'Calendar' :
                        if(props.$DarkMode){
                            return css`background: url(/img/project/bg_darkmode.jpg);`
                        }else{
                            return css`background: url(/img/project/bg.jpg);`
                            // return css`background: linear-gradient(to right, #775ec2, #6672c4);`
                    }
            case 'Contact' :
                if(props.$DarkMode){
                        return css`background: url(/img/contact/bg.jpg);`
                    }else{
                        return css`background: linear-gradient(to right, #5c68c8, #669dc4);`
                    }
            default :
                return ''
        }
    }}
`

export default function DashBoard({ className , page ,children}) {
    const ctx = useContext(DarkMode);

    useEffect(()=>{
        const target = document.getElementById('parallaxEvent');
        const ParallaxHandler = () =>{
            const Scroll = window.scrollY;
            target.style.backgroundPosition = `0 -${Scroll / 15}px`;
        }
        document.addEventListener('scroll', ParallaxHandler)
    },[]);
    
    return(
        <DashBoardStyle
            id='parallaxEvent'
            $page={page}
            className={className}
            $DarkMode={ctx.darkMode}
        >{children}
        
        </DashBoardStyle>
    )
}