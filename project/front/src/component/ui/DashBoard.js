import { useContext } from 'react';
import styled , { css } from 'styled-components';
import {DarkMode} from '../../context/DarkModeContext';


const DashBoardStyle = styled.div`
    width: 100%;
    height: 650px;
    background-size: cover;
    /* background: #212123; */
    position: absolute;
    z-index: -1;
    background-size: cover;
    transition: background .5s ease;
    ${props => {
        switch(props.$page){
            case 'project' :
                    if(props.$DarkMode){
                        return css`background: url(/img/project/bg_darkmode.jpg);`
                    }else{
                        return css`background: url(/img/project/bg.jpg);`
                    }
            case 'board' :
                return css`background: linear-gradient(to right, #5d7197, #2d3f60);`
            default :
                return ''
        }
    }}
`

export default function DashBoard({page ,children}) {
    const ctx = useContext(DarkMode);
    
    return(
        <DashBoardStyle
            $page={page}
            $DarkMode={ctx.darkMode}
        >{children}</DashBoardStyle>
    )
}