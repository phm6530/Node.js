import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate , useLocation } from 'react-router-dom';
import alertThunk from '../../../store/alertTrunk';

export default function ProjectSeach(){
    const [ input , setInput ] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {login}  = useSelector(state => state.authSlice);
    console.log('login : ',login);
    
    const seachProejct = (e) =>{
        e.preventDefault();

        if(input.trim() === ''){
            navigate('/project');
            return;
        }
        navigate(`${location.pathname}?seach=${input}`)
    }
    const AuthCheck = (text) =>{
        if(!login){
            dispatch(alertThunk(`${text} 권한이 없습니다.`),0);
            return false;
        }
        return true;
    }

    const nav = (path) =>{
        if(!AuthCheck('생성')) {
            console.log('안됨');
            return;
        }
        navigate(location.pathname + path);
    }

    return(
        <>
          <form onSubmit={seachProejct}>
                <input type="text" onChange={(e)=>setInput(e.target.value)}/>
                <button type='submit'>검색</button>
            </form>
            
            <button onClick={()=>nav('/add')}>add</button>
        </>
    )
}