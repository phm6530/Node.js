import RootNav from './RootNav'
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef, useState } from 'react';

import Popup from '../popup/Popup'
import styled, { css } from 'styled-components';
import LoginForm from '../popup/login/LoginForm';
import Gird from '../ui/Grid';
import Footer from './Footer';
import Timer from './Timer';

const PageChange = styled.div`
    ${props => {
        switch(props.$path){
            case '/' : 
                return css`
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
            <Gird>
                <Timer/>
            </Gird>

            <PageChange ref={wrapRef} $path={path} className='loaded'>
                    <Outlet/>
            </PageChange>

            {/* Footer */}
            <Gird>
                <Footer/>
            </Gird>
        </>
    )

}