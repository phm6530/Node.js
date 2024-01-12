import { useDispatch } from 'react-redux';
import { alertAction } from '../../store/appSlice';

const useAlert = () => {
    const dispatch = useDispatch();

    const showAlert = (message) => {
        dispatch(alertAction.alertViewOn(message));
        
        setTimeout(() => {
            dispatch(alertAction.alertViewOff());
        }, 3000);
    };

    return showAlert;
};

export default useAlert;