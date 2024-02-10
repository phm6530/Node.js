import { useDispatch } from 'react-redux';
import { alertAction } from '../../store/appSlice';
import { useState } from 'react';

const useAlert = () => {
    const dispatch = useDispatch();
    const [ timerId , setTimerId ] = useState(null);
    console.log('timerId : ', timerId);
    console.count();
    const showAlert = (message, type) => {
        if(timerId) {
            console.log('삭제 타이머 ID :' , timerId );
            clearTimeout(timerId);
            console.log('클리어 타임아웃 삭제');
            dispatch(alertAction.alertViewOff());
        }

        dispatch(alertAction.alertViewOn({message , type})); //실행 ok
        
        const timer = setTimeout(() => {  // off 등록
            dispatch(alertAction.alertViewOff());
            setTimerId(null); //Timer Id 삭제 
        }, 3000);

        setTimerId(timer);//timer Id 등록
    
    };
    console.log('예약 타이머 ID :' , timerId ); 
    return showAlert;
};

export default useAlert;