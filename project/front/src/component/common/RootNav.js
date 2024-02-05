import {  useContext, useState } from 'react';
import { DarkMode } from '../../context/DarkModeContext';
import LogOut from './LogOut';

import styled from 'styled-components';

// redux 
import { useSelector } from 'react-redux';

// icon 
import { Moon } from '../icon/Icon';

// Component
import Alert from '../popup/Alert';

import DarkModeBtn from '../ui/DarkModeBtn';
import { useLocation } from 'react-router-dom';


// Nav 선택
const Link = ({children , className , to , ...prop }) =>{
    return <li className={className} {...prop}>{children}</li>
}

//css in js  초기랜더링 > 훅실행 > 스타일 생성 
const List = styled(Link)`
    transition:  color .6s cubic-bezier(0, 0.88, 0, 1.03);
    ${props => props.$active ? `color : red;`  : ''}
`

export default function RootNav({setViewPopup, ChangePageHandler}){
    const { view } = useSelector(state => state.alertSlice);
    const { login } = useSelector(state => state.authSlice);
    const { pathname } = useLocation();
    console.log('pathName:', pathname);
    const [ active, setActive ] = useState(pathname);

    const logOut =  LogOut();

    //Dark Mode
    const ctx = useContext(DarkMode); 
    const NavPageObject = [
        { path : '/' , pathName : 'HOME' , AuthPage : false },
        { path : '/project' , pathName : 'PROJECT' , AuthPage : false },
        { path : '/todoCalnder' , pathName : 'MY Calendar' , AuthPage : false },
        { path : '/admin' , pathName : 'Admin' , AuthPage : true },
    ]

    return(
        <>  
            {/* Alert */}
            { view && <Alert/>}

            <nav>
                <DarkModeBtn  onClick={ctx.toggleMode} $darkMode={ctx.darkMode}> 
                    <Moon size={'15'}/>
                    <Moon size={'15'}/>
                </DarkModeBtn>

                {/* Nav */}
                <ul>

                    {
                        NavPageObject.map((e,idx)=>{
                            if(e.AuthPage){
                                return (login && ( 
                                <List 
                                    key={idx} 
                                    $active={active === e.path} 
                                    onClick={()=>{ChangePageHandler(e.path); setActive(e.path)}}  
                                    to={e.path}
                                >        
                                        {e.pathName}
                                </List> ))
                            }
                            return <List 
                                to={e.path}
                                key={idx}    
                                $active={active === e.path} 
                                onClick={()=>{ChangePageHandler(e.path); setActive(e.path)}}
                            >{e.pathName}</List>
                        })
                    }
                    
          
                    {/* login Component */}
                    {!login && (
                        <li onClick={()=>setViewPopup(true)}>
                            로그인
                        </li>
                    )}
                    {login && (
                        <li onClick={logOut}>
                            로그아웃
                        </li>
                    )}

                </ul>
            </nav>
        </>
    )
}