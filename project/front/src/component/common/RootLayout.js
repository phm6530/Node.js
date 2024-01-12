import RootNav from './RootNav'
import { Outlet } from 'react-router-dom';
import { DarkMode } from '../../context/DarkModeContext';
import { useEffect , useContext } from 'react';
import { useSelector } from 'react-redux'; 

export default function RootLayout(){
    const {darkMode} = useContext(DarkMode);
    const login = useSelector(state => state.authSlice.login)

    // console.log('darkMode', darkMode);
    
    useEffect(()=>{
        if(darkMode === true){
            document.body.classList.add('darkMode');
        }else{
            document.body.classList.remove('darkMode');
        }
    },[darkMode]);

    return(
        <>
            <RootNav login={login}/>
            <Outlet/>
        </>
    )

}