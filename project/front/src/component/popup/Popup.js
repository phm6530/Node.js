import classes from './Popup.module.css';
import ReactDOM from 'react-dom';

import LoginForm from './login/LoginForm';

export default function Popup(props){
    const { popupClose } = props;

    // background
    const Backdrop = ({popupClose}) =>{
        return <div className={classes.backdrop} onClick={popupClose}></div>
    }

    //로그인팝업
    const PopupContainer = ({popupClose}) =>{
        return (
            <div className={classes.popupContainer}>
                <LoginForm
                    popupClose={popupClose}
                />
                <button onClick={popupClose}>닫기</button>
            </div>
        )
    }

    return(
        <>
            {
                ReactDOM.createPortal(
                    <Backdrop 
                        popupClose={popupClose}
                    />,
                    document.getElementById('backdrop-root')
                )
            }

            {
                ReactDOM.createPortal(
                    <PopupContainer
                        popupClose={popupClose}
                    />,
                    document.getElementById('modal-root')
                )
            }
        </>
    )
}