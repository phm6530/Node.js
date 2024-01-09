import RootNav from './RootNav'
import { Outlet } from 'react-router-dom';
import { DarkMode } from '../../context/DarkModeContext';
import { useEffect , useContext } from 'react';

import  { UserAuth } from '../../context/AuthContext';

export default function RootLayout(){
    const { user } = useContext(UserAuth);
    const {darkMode} = useContext(DarkMode);

    console.log('로그인 유무 : ', user.login);


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
          
                <RootNav login={user.login}/>
                <Outlet/>
              
        </>
    )

}