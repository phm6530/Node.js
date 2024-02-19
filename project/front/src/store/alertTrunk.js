import { alertAction } from './appSlice';

const alertThunk = (message, type) => (dispatch , getState) => {
    const {alertSlice : { TimerId } } = getState();
    
    if(TimerId){
        clearTimeout(TimerId);
        dispatch(alertAction.alertViewOff());
    }

    dispatch(alertAction.alertViewOn({message,type}));
    const setTimerId = setTimeout(()=>{
        dispatch(alertAction.alertViewOff());
    },5000);
    
    dispatch(alertAction.alertTimerId({setTimerId}));
};

export default alertThunk;