import classes from './Popup.module.css';
import ReactDOM from 'react-dom';
import React , { useCallback, useEffect, useState} from 'react';

import { PopupWrap, PopupStyle } from './PopupStyle';
import { useSelector } from 'react-redux';


// background
const Backdrop = () =>{
    return <div className={classes.backdrop}></div>
}


export default function Popup({closePopup, type , children}){
    const [ animationState , setAniamtionState ] = useState(false);
    const isAuth = useSelector(state => state.authSlice.login);
    console.log(type);

    // 닫기 & CLose 애니메이션
    const ClosePopup = useCallback(() =>{
        setAniamtionState(true);
        setTimeout(()=>{
            setAniamtionState(false);
            closePopup();
        },400);
    },[closePopup , setAniamtionState]);
    
    
    console.log('isAuth : ',isAuth);

    useEffect(() => {
        if (isAuth && type === 'Login') {
            ClosePopup();
            return;
        }
    }, [isAuth,  ClosePopup , type]);
    
    return(
        <>
            {
               ReactDOM.createPortal(
                    <Backdrop/>,
                    document.getElementById('backdrop-root')
                )
            }

            {
                ReactDOM.createPortal(
                    <PopupStyle>
                        <PopupWrap  $close={animationState}>
                            {/* children */}
                            {React.cloneElement(children , {ClosePopup} ,type)}
                            
                            <button onClick={ClosePopup} className='close'>
                                <span>Close</span>
                            </button>
                        </PopupWrap>
                    </PopupStyle>,
                    document.getElementById('modal-root')
                )
            }
        </>
    )
}