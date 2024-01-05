import classes from './Popup.module.css';
import ReactDOM from 'react-dom';

// style 컴포넌트
// import Boxstyle from '../ui/BoxStyle';

export default function Popup(props){

    const { popupClose } = props;

    const Backdrop = ({popupClose}) =>{
        return <div className={classes.backdrop} onClick={popupClose}></div>
    }

    const PopupContainer = ({popupClose}) =>{
        return (
            <div className={classes.popupContainer}>
                <button onClick={popupClose}>Close</button>
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