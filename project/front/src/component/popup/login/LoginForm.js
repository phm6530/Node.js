import { LoginUser , LoginPassword  } from '../../icon/Icon';
import { useEffect, useState , useContext} from 'react';
import { UserAuth } from '../../../context/AuthContext';
import LoginInput from '../../ui/LoginInput';
import useAlert from '../../common/UseAlert';

export default function LoginForm({popupClose}){
    const { setUser } = useContext(UserAuth);
    const showAlert = useAlert();

    const [ fromValid , setFormValid ] = useState(false);
    const [ loginData , setLoginData ] = useState(
        {   
            id : { value : '' , isValid : false , touched : false },
            pw : { value : '' , isValid : false , touched : false }
        }    
    );  
   
    const isIdValid =  !loginData.id.isValid && loginData.id.touched;
    const isPwValid =  !loginData.pw.isValid && loginData.pw.touched;

    // 디바운싱
    useEffect(()=>{
        
        const debounce = setTimeout(()=>{
            setFormValid(loginData.id.isValid && loginData.pw.isValid);
        },500);

        return()=>{
            clearInterval(debounce);
        }
    },[loginData]);
        

    // 로그인 로직
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8080/login', {
                method : "POST",
                headers : {
                    'ConTent-Type' : 'application/json'
                },
                body : JSON.stringify({
                    user_id : loginData.id.value,
                    user_password : loginData.pw.value
                })
            });
    
            if(!response.ok){
                throw new Error('서버 응답 오류: ' + response.status);
            }
            const resultData = await response.json();
            // 토큰 저장
            localStorage.setItem('token', resultData.token);
    
            // 로그인 상태 업데이트 
            setUser(prev =>({...prev , login : !prev.login}));
    
            showAlert('로그인 되었습니다');

            // 로그인 팝업 닫기
            popupClose();
        }
        catch(error){
            console.error(error);
            showAlert('로그인이 실패하였습니다. 서버 상태를 확인하세요.');
            popupClose();
        }
    
    }
    
    return(
        <>
           <form onSubmit={onSubmitHandler}>
                <label>
                    <LoginUser size={30}/>
                    <LoginInput
                        type = 'text'
                        dataType = 'id'
                        holder = '아이디'
                        setFormData = {setLoginData}
                    />
                    {isIdValid && 'error'}
                </label>

                <label>                    
                    <LoginPassword size={30}/>
                    <LoginInput
                         type = 'password'
                         dataType = 'pw'
                         holder = 'password'
                         setFormData = {setLoginData}
                    />
                    {isPwValid && 'error'}
                </label>

                <button
                    disabled={!fromValid}
                >로그인</button>
            </form>
        </>
    )
}
