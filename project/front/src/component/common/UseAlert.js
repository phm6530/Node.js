import { useDispatch } from 'react-redux';
import { alertAction } from '../../store/appSlice';

const useAlert = () => {
    const dispatch = useDispatch();
    let debounce = null;
    
    const showAlert = (message, type) => {
        if(debounce) clearTimeout(debounce);
        dispatch(alertAction.alertViewOn({message , type}));
        
        debounce = setTimeout(() => {
            dispatch(alertAction.alertViewOff());
            debounce = null;
        }, 3000);        
    };

    return showAlert;
};

export default useAlert;