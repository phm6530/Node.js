import { alertAction } from './appSlice';

const alertThunk = (message, type) => (dispatch) => {
    dispatch(alertAction.alertViewOn({message,type}));

    setTimeout(()=>{
        dispatch(alertAction.alertViewOff());
    },3000);
};

export default alertThunk;