import ReactDom from 'react-dom';
import classes from './Alert.module.css';
import { AlertContext } from '../../context/AlertContext';
import { useContext } from 'react';

export default function Alert(){
    const { alertMessage } =  useContext(AlertContext);
    const AlertMessage = () =>{
        return <div className={classes.Alert}>{alertMessage}</div>
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