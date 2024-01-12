import RootNav from './RootNav'
import { Outlet } from 'react-router-dom';

import {   useState } from 'react';
import Popup from '../popup/Popup';

export default function RootLayout(){
    const [ viewPopup , setVIewPopup ] = useState(false);

    const closePopup = () =>{
        setVIewPopup(false);
    }

    return(
        <>  
            {/* 로그인 팝업 */}
            {/* 24/1/13 - 하위컴포넌트 랜더링 문제가 있어서 변경함 */}
            { viewPopup &&  <Popup popupClose={closePopup} />}

            <RootNav setViewPopup={setVIewPopup}/>
            <Outlet/>
        </>
    )

}