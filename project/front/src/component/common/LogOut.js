import { useDispatch } from 'react-redux';
import { authAction } from '../../store/appSlice';
import useAlert from './UseAlert'; 

const LogOut =() =>{
    const dispatch = useDispatch();
    const showAlert = useAlert();
    
    const logOutAction = () =>{
        localStorage.removeItem('token');
        dispatch(authAction.logOut());
        showAlert('로그아웃 되었습니다.' , 1);
    }
    
    
    return logOutAction;
}

export default LogOut;