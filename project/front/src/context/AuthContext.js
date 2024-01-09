import { useState , createContext , useEffect } from 'react';
import useAlert from '../component/common/UseAlert';

const UserAuth = createContext();

const Auth = (props)=>{
    const [ user , setUser ] = useState({ login : false });
    const showAlert = useAlert();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // 토큰이 존재할 경우 로그인 상태를 true로 설정
            setUser({ login: true });
        }
    }, []);

    const logOut = () =>{
        setUser(prev => ({...prev, login : false}));
        localStorage.removeItem('token');
        
        showAlert('로그아웃 되었습니다.');
    }
    
    const authValue = {
        user , 
        setUser,
        logOut
    }

    return (
        <UserAuth.Provider value={authValue}>
            {props.children}
        </UserAuth.Provider>
    )
}

export { 
    UserAuth , 
    Auth 
}