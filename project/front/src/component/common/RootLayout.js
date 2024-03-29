import RootNav from './RootNav'
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

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
            case '/Board' : 
                return css`
                    /* background: red; */
                `
            default :
                return css`
                    
                `
        }
    }}
`


export default function RootLayout(){
    const { pathname } = useLocation();
    const [ path ,setPath ] = useState(pathname);
    const [ IDtimeOut , setIDTimeout] = useState(false);

    // 라우터 시에 최상단으로 이동
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[pathname]);

    const wrapRef = useRef();
    const navigate = useNavigate();

    const ChangePageHandler = (path) =>{    
        if(IDtimeOut) clearTimeout(IDtimeOut);
        if(pathname !== path){
            wrapRef.current.classList.replace('loaded', 'unloaded');
        }

        const ID = setTimeout(()=>{
            navigate(path);
            wrapRef.current.classList.replace('unloaded', 'loaded');
            setPath(path);
            setIDTimeout(false);
        },400);
        
        setIDTimeout(ID);
    }
    
    return(
        <>    

            {/* 로그인 팝업 */}
            {/* 24/1/13 - 하위컴포넌트 랜더링 문제가 있어서 변경함 */}
            
         
            {/* Common Nav */}
            <RootNav 
                ChangePageHandler={ChangePageHandler}
            />
            {/* <Gird>
                <Timer/>
            </Gird> */}

            <PageChange ref={wrapRef} $path={path} className='loaded'>
                    <Outlet/>
                    {/* Footer */}
                    <Footer/>
            </PageChange>

            
            
         
            
        </>
    )

}