import RootNav from './RootNav'
import { Outlet } from 'react-router-dom';
import { DarkMode } from '../../context/Context';
import { useEffect , useContext } from 'react';


export default function RootLayout(){
    const {darkMode} = useContext(DarkMode);
    console.log('darkMode', darkMode);
    
    useEffect(()=>{
        if(darkMode === true){
            document.body.classList.add('darkMode');
        }else{
            document.body.classList.remove('darkMode');
        }
    },[darkMode]);

    return(
        <>
          
                <RootNav/>
                <Outlet/>
              
        </>
    )

}