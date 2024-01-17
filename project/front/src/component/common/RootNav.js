import { NavLink } from 'react-router-dom';
import {  useContext } from 'react';
import { DarkMode } from '../../context/DarkModeContext';
import LogOut from './LogOut';

// redux 
import { useSelector } from 'react-redux';

// Style Moduel
import classes from './RootLayout.module.css';

// Component

import Alert from '../popup/Alert';

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
                            to='/Board'
                            className={({isActive}) => 
                            isActive ? classes.active : undefined
                        }>
                        Board
                    </NavLink>
                    </li>
                        
                    <li>
                    <NavLink
                            to='/todoCalnder'
                            className={({isActive}) => 
                            isActive ? classes.active : undefined
                        }>
                        Calendar
                    </NavLink>
                    </li>

                    {login && (
                        <li>
                            <NavLink
                                to='/admin'
                                className={({isActive}) => 
                                isActive ? classes.active : undefined}>
                                Admin
                            </NavLink>
                        </li>
                    )}
                    
                    
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