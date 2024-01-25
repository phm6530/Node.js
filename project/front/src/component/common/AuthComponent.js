import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useAlert from './UseAlert';



export default  function AuthComponent({Component , redirectPath}){
    const { Auth } = useLoaderData(); // 서버 인증확인
    const isAuth = useSelector(state => state.authSlice); // 클라이언트 인증확인
    const showPopup = useAlert();
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isAuth || !Auth) {
        navigate(redirectPath);
        showPopup('권한이 없습니다.' , 0 );
      }
    }, [isAuth, Auth, navigate, redirectPath ,  showPopup]);

    return (isAuth && Auth) ? <Component/> : null;
    
}
