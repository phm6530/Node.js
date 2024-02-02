import { NavLink } from 'react-router-dom';
import {  useContext } from 'react';
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


// Nav 선택
const link = ({children ,  to , ...prop }) =>{
    return <li {...prop}><NavLink to={to}>{children}</NavLink></li>
}

//css in js  초기랜더링 > 훅실행 > 스타일 생성 
const List = styled(link)`
    
    a{
        transition:  color .5s ease;
        color : blue;

        &.active{
            color:red;
        }
    }
    
`
const Mybutton = styled.button`
	background: rgba(255,255,255,.7);
    color: #fff;
`




export default function RootNav({setViewPopup}){
    const { view } = useSelector(state => state.alertSlice);
    const { login } = useSelector(state => state.authSlice);
    
    const logOut =  LogOut();


    //Dark Mode
    const ctx = useContext(DarkMode);

    return(
        <>  
        
            {/* Alert */}
            { view && <Alert/>}
            <Mybutton>hello world</Mybutton>
            <nav>
                <DarkModeBtn  onClick={ctx.toggleMode} $darkMode={ctx.darkMode}> 
                    <Moon size={'15'}/>
                    <Moon size={'15'}/>
                </DarkModeBtn>

                <ul>
                    {/* Nav */}
                    <List to={'/'}>HOME</List>
                    <List to={'/project'}>PORTPOLIO</List>
                    <List to={'/Board'}>Board</List>
                    <List to={'/todoCalnder'}>Calendar</List>
                    {login && ( <List to={'/admin'}>admin</List> )}
                    <List to={'/ani'}>ani</List>
                    
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