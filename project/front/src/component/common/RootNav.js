import { NavLink } from 'react-router-dom';
import { useState , useContext } from 'react';
import { DarkMode } from '../../context/Context';


// Style Moduel
import classes from './RootLayout.module.css';

// Component
import Popup from '../popup/Popup';

export default function RootNav(){
    const [ viewPopup , setVIewPopup ] = useState(false);

    //Dark Mode
    const ctx = useContext(DarkMode);
    // console.log( ctx.darkMode);
    
    const closePopup = () =>{
        setVIewPopup(false);
    }
    
    return(
        <>  
            {/* 로그인 팝업 */}
            { viewPopup &&  <Popup popupClose={closePopup}/>}
            <nav>
                <button onClick={ctx.toggleMode}>
                    {ctx.darkMode ? '다크모드 on' : '다크모드 off'}
                </button>
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
                        Admin
                    </li>

                </ul>
            </nav>
        </>
    )
}