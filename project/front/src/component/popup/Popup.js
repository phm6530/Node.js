import classes from './Popup.module.css';
import ReactDOM from 'react-dom';

import { useEffect, useState } from 'react';
import PopupStyle from './PopupStyle';
import { useSelector } from 'react-redux';


export default function Popup({popupClose , children}){
    const [ close , setClose ] = useState(false);
    const isAuth = useSelector(state => state.authSlice.login);

    // background
    const Backdrop = ({popupClose}) =>{
        return <div className={classes.backdrop} onClick={popupClose}></div>
    }

    // 닫기 애니메이션
    const ClosePopup = () =>{
        setClose(true);
        setTimeout(()=>{
            popupClose();
            setClose(false);
        },400);
    }

    
    useEffect(()=>{
        if(isAuth){
            ClosePopup();
        }
    },[isAuth]);


    return(
        <>
            {
                ReactDOM.createPortal(
                    <Backdrop 
                        // popupClose={popupClose}
                    />,
                    document.getElementById('backdrop-root')
                )
            }

            {
                ReactDOM.createPortal(
                    <PopupStyle $close={close}>
                        <div>

                            {children}
                            {/* <LoginForm popupClose={ClosePopup} /> */}

                            
                            <button onClick={ClosePopup} className='close'>
                                <span>Close</span>
                            </button>
                        </div>
                    </PopupStyle>,
                    document.getElementById('modal-root')
                )
            }
        </>
    )
}