import { useDispatch } from 'react-redux';
import { authAction } from '../../store/appSlice';
import useAlert from './UseAlert'; 

const LogOut =() =>{
    const dispatch = useDispatch();
    const showAlert = useAlert();

    const logOutAction = () =>{
        localStorage.removeItem('token'); //JWT 삭제

        showAlert('로그아웃 되었습니다.');
        dispatch(authAction.logOut());
    }
    
    
    return logOutAction;
}

export default LogOut;