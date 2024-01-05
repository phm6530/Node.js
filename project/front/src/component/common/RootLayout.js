import RootNav from './RootNav'
import { Outlet } from 'react-router-dom';
import { DarkMode } from '../../context/Context';
import { useEffect , useContext } from 'react';


export default function RootLayout(){
    const {darkMode} = useContext(DarkMode);
    console.log('darkMode', darkMode);
    useEffect(()=>{
        console.log('동작');
    },[darkMode]);

    return(
        <>
          
                <RootNav/>
                <Outlet/>
              
        </>
    )

}