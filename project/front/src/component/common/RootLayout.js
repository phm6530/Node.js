import RootNav from './RootNav'
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Popup from '../popup/Popup'
import styled, { css } from 'styled-components';
import LoginForm from '../popup/login/LoginForm';

const PageChange = styled.div`
    /* transition: background ease-in-out; */
    /* background:  #000; */
    ${props => {
        switch(props.$path){
            case '/' : 
                return css`
                    /* background: red; */
                `
            case '/project' : 
                return css`
                    
                `
            default :
                return css`
                    
                `
        }
    }}
`

const Timer = ({...props}) =>{
    const [ time , setTime ] = useState(new Date());
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setTime(new Date());
        },1000);    

        return()=> clearTimeout(timer);
    },[time]);   

    return(
        <>
            <div {...props}>{time.toLocaleTimeString().replace('오전', 'AM').replace('오후', 'PM')}</div>
        </>
    )
}

const TimerStyle = styled(Timer)`
    position: absolute;
    z-index: 1;
    font-weight: bold;
    font-size: 40px;
    background:#fff;

`


export default function RootLayout(){
    const [ viewPopup , setVIewPopup ] = useState(false);
    const [ path ,setPath ] = useState(null);
    const { pathname } = useLocation();
    
    const wrapRef = useRef();
    const navigate = useNavigate();
    const closePopup = () => setVIewPopup(false);

    const ChangePageHandler = (path) =>{    
        if(pathname === path) return 
        if(pathname !== path){
            wrapRef.current.classList.replace('loaded', 'unloaded');
        }
       
        setTimeout(()=>{
            navigate(path);
            wrapRef.current.classList.replace('unloaded', 'loaded');
            setPath(path);
        },390);
    }
    
    return(
        <>    

            {/* 로그인 팝업 */}
            {/* 24/1/13 - 하위컴포넌트 랜더링 문제가 있어서 변경함 */}
            { viewPopup &&  <Popup popupClose={closePopup} >
                    <LoginForm/>
                </Popup>}

            {/* Common Nav */}
            <RootNav 
                setViewPopup={setVIewPopup}
                ChangePageHandler={ChangePageHandler}
            />
            <TimerStyle/>
            <PageChange ref={wrapRef} $path={path} className='loaded'>
                    <Outlet/>
            </PageChange>
        </>
    )

}