import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData , useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import alertThunk from '../../store/alertTrunk';


export default function useAuthRedirect(redirectPath){
    const isAuth = useSelector(state => state.authSlice.login); // 클라이언트 인증로직
    const { Auth } = useLoaderData(); // 서버 인증로직
    const dispatch = useDispatch();

    const navigate = useNavigate(); 

    useEffect(()=>{
        if(Auth === false || isAuth === false){
            navigate(redirectPath);
            dispatch(alertThunk('권한이 없습니다' , 0 ));
        }
    },[ dispatch ,redirectPath ,navigate ,isAuth , Auth]);  //서버 , 클라이언트에서 모두 체킹
}