import { useDispatch } from 'react-redux';
import { authAction } from '../../store/appSlice';
import alertThunk from '../../store/alertTrunk';


const LogOut =() =>{
    const dispatch = useDispatch();

    
    const logOutAction = () =>{
        localStorage.removeItem('token');
        dispatch(authAction.logOut());
        dispatch(alertThunk('로그아웃 되었습니다.' , 1));
    }
    
    
    return logOutAction;
}

export default LogOut;