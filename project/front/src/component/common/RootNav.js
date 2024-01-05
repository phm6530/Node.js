import { NavLink } from 'react-router-dom';
import { useState } from 'react';

// Style Moduel
import classes from './RootLayout.module.css';

// Component
import Popup from '../popup/Popup';

export default function RootNav(){
    const [ viewPopup , setVIewPopup ] = useState(false);

    const closePopup = () =>{
        setVIewPopup(false);
    }
    
    return(
        <>  
            {/* 로그인 팝업 */}
            { viewPopup &&  <Popup popupClose={closePopup}/>}
            <nav>
                <ul>
                    
                    {/* Nav 1 */}
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) => 
                            isActive ? classes.active : undefined}
                            end
                        >
                        Home
                        </NavLink>
                    </li>

                    {/* Nav 2 */}
                    <li>
                    <NavLink
                            to='/project'
                            className={({isActive}) => 
                            isActive ? classes.active : undefined
                        }>
                        PORTPOLIO
                    </NavLink>
                    </li>

                    {/* Nav 3 */}
                    <li>
                    <NavLink
                            to='/notice'
                            className={({isActive}) => 
                            isActive ? classes.active : undefined
                        }>
                        Notice
                    </NavLink>
                    </li>

                    <li onClick={()=>setVIewPopup(prev => !prev)}>
                        로그인
                    </li>

                </ul>
            </nav>
        </>
    )
}