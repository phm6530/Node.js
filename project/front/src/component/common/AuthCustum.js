import { useSelector } from 'react-redux';
import { useLoaderData , useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAlert from './UseAlert';

export default function useAuthRedirect(redirectPath){
    const showAlert =useAlert();
    const isAuth = useSelector(state => state.authSlice.login); // 클라이언트 인증로직
    const { Auth } = useLoaderData(); // 서버 인증로직
    const navigate = useNavigate(); 
    
    useEffect(()=>{
        if(Auth === false || isAuth === false){
            navigate(redirectPath);
            showAlert('관리자 권한이 없습니다.');
        }

    },[showAlert , redirectPath ,navigate ,isAuth , Auth]);  //서버 , 클라이언트에서 모두 체킹
}