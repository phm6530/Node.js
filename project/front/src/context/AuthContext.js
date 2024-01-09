import { useState , createContext , useEffect } from 'react';

const UserAuth = createContext();

const Auth = (props)=>{
    const [ user , setUser ] = useState({ login : false });
    
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