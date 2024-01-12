import ReactDom from 'react-dom';
import classes from './Alert.module.css';
import { useSelector } from 'react-redux';

export default function Alert(){
    const { message } = useSelector(state => state.alertSlice);
    const AlertMessage = () =>{
        return <div className={classes.Alert}>{message}</div>
    }

    return(
        <>
            {
                ReactDom.createPortal(
                    <AlertMessage/> ,
                    document.getElementById('alert-root')
                )
            }
        </>
    )
}