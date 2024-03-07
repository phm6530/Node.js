import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import alertThunk from '../../store/alertTrunk';
import { useDispatch } from 'react-redux'; 

export default  function AuthComponent({Component , redirectPath}){
    const { Auth } = useLoaderData(); // 서버 인증확인
    const isAuth = useSelector(state => state.authSlice); // 클라이언트 인증확인
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
      if (!isAuth || !Auth) {
        navigate(redirectPath);
        dispatch(alertThunk('권한이 없습니다' , 0 ));
      }
    }, [isAuth, Auth, navigate, redirectPath , dispatch ]);

    return (isAuth && Auth) ? <Component/> : null;
}