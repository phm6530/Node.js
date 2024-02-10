import { alertAction } from './appSlice';

const alertThunk = (message, type) => (dispatch , reduxState) => {
    const {alertSlice : { TimerId } } = reduxState();
    console.log('TimerId : ', TimerId);
    if(TimerId){
        clearTimeout(TimerId);
        dispatch(alertAction.alertViewOff());
    }

    dispatch(alertAction.alertViewOn({message,type}));
    const setTimerId = setTimeout(()=>{
        dispatch(alertAction.alertViewOff());
    },3000);
    console.log('setTimerId :' , setTimerId);
    dispatch(alertAction.alertTimerId({setTimerId}));
};

export default alertThunk;