import RootNav from './RootNav'
import { Outlet } from 'react-router-dom';

export default function RootLayout(){
    return(
        <>
            <RootNav/>
            <Outlet/>
        </>
    )

}