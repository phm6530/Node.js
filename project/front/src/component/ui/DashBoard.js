import {  useEffect } from 'react';
import styled , { css } from 'styled-components';

import VideoCanvas from '../common/VideoCanvas';
import { HeaderGird } from './Grid';
import { useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";

const DashBoardStyle = styled.div`
    width: 100%;
    height: 29rem;
    overflow: hidden;
    position: absolute;
    z-index: -1;
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
                            // return css`background: url(/img/board/banner.jpg);`
                        return css`background: linear-gradient(to right, #775ec2, #6672c4);`
                    }
                    case 'Calendar' :
                        if(props.$DarkMode){
                            return css`background: url(/img/project/bg_darkmode.jpg);`
                        }else{
                            // return css`background: url(/img/project/bg.jpg);`
                            return css`background: linear-gradient(to right, #775ec2, #6672c4);`
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
        background-size: cover;
`

const PathStyle = styled.div`
    color: #fff;
    opacity: .4;
    display: flex;
    font-size: .9rem;
    align-items: center;
    svg{
        margin-right: 1rem;
    }
`

export default function DashBoard({ className , page ,children}) {
    const { pathname } = useLocation();
    
    useEffect(()=>{
        const target = document.getElementById('parallaxEvent');
        const ParallaxHandler = () =>{
            const Scroll = window.scrollY;
            target.style.backgroundPosition = `0 -${Scroll / 15}px`;
        }
        document.addEventListener('scroll', ParallaxHandler)
    },[]);
    const path = pathname.slice(1)
    return(
        <DashBoardStyle
            id='parallaxEvent'
            $page={page}
            className={className}
            // $DarkMode={ctx.darkMode}
        >
            <HeaderGird>
                {children}
                {/* <p>*전 회사의 공개 가능한 프로젝트 / 개인 작업물만 공유합니다.</p> */}
                <PathStyle><IoMdHome/> HOME / {path}</PathStyle>
            </HeaderGird>
asfsafasfsf

            {/* Video */}
            <VideoCanvas/>
        </DashBoardStyle>
    );
}