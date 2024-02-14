import classes from './Popup.module.css';
import ReactDOM from 'react-dom';

import { useCallback, useEffect } from 'react';
import PopupStyle from './PopupStyle';
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from '../../store/appSlice';
// import LoginForm from './login/LoginForm';
// import Confirm from '../ui/Confirm';

export default function Popup({close , children}){
    
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
            close();
        },400);
    },[dispatch , close]);

    // useEffect(() => {
    //     if (isAuth) {
    //         ClosePopup();
    //         return;
    //     }
    // }, [isAuth, ClosePopup]);

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
                            {children}
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