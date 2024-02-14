import classes from './Popup.module.css';
import ReactDOM from 'react-dom';
import React , { useCallback, useEffect, useState} from 'react';
import PopupStyle from './PopupStyle';
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/appSlice';

export default function Popup({closePopup, children}){
    const isAuth = useSelector(state => state.authSlice.login);
    const { openComponent , animationState } = useSelector(state => state.modalSlice);

    const dispatch = useDispatch();


    // background
    const Backdrop = ({popupClose}) =>{
        return <div className={classes.backdrop} onClick={popupClose}></div>
    }

    // 닫기 애니메이션
    const ClosePopup = useCallback(() =>{
        dispatch(modalAction.modalAnimation(true));
        setTimeout(()=>{
            dispatch(modalAction.modalAnimation(false));
            closePopup();
        },400);
    },[dispatch , closePopup]);

    // console.log('isAuth : ',isAuth);
    // console.log('openComponent : ',openComponent);

    // useEffect(() => {
    //     if (isAuth && openComponent ==='login') {
    //         ClosePopup();
    //         return;
    //     }
    // }, [isAuth, openComponent, ClosePopup]);

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
                    <PopupStyle $close={animationState}>
                        <div>
                            {React.cloneElement(children , {ClosePopup})}
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