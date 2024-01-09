import { useContext } from 'react';
import { AlertContext } from '../../context/AlertContext';

const useAlert = () => {
    const { setView, setAlertMessage } = useContext(AlertContext);

    const showAlert = (message) => {
        setAlertMessage(message);
        setView(true);
    };
    return showAlert;
};

export default useAlert;