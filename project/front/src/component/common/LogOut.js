import { useDispatch } from 'react-redux';
import { authAction } from '../../store/appSlice';
import alertThunk from '../../store/alertTrunk';

const fetchLogout = async(token) =>{
    try{   
        const response = await fetch('http://localhost:8080/logout',{
            method : 'POST',
            headers : {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'application/json' 
            }
        });
        if(!response.ok){
            // const errorResponse = await response.json();
            throw new Error('에러!');
        }
        return response.json();
    }catch(error){
        throw new Error(error.message || '서버에 문제가 있습니다.');
    }
    
}


const LogOut = () =>{
    const dispatch = useDispatch();
        const logOutAction = async() =>{
            try{
                const token = localStorage.getItem('token');
                const result = await fetchLogout(token);
                console.log(result);

                localStorage.removeItem('token');
                dispatch(authAction.logOut());
                dispatch(alertThunk('로그아웃 되었습니다.' , 1));
            }
            catch(error){
                dispatch(alertThunk(error.message , 0));
            }
            
        }
        
        return logOutAction;
    

}

export default LogOut;