import { useDispatch , useSelector} from 'react-redux';
import alertThunk from '../../store/alertTrunk';



export const useAuthCheck = () =>{
    const dispatch = useDispatch();
    const { login } = useSelector(state => state.authSlice);

    const clientAuthCheck = (message) =>{
        if(!login){
            dispatch(alertThunk(`${message} 권한이 없습니다.`),0);
            return false;
        }
        return true;
    }
    return {
        clientAuthCheck
    }
    
}

