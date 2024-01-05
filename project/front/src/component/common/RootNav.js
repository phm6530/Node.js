import { NavLink } from 'react-router-dom';
import classes from './RootLayout.module.css';

export default function RootNav(){

    return(
        <>
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
                        Nav_1
                    </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}