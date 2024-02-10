import { useEffect, useState } from 'react';
import useAlert from '../../common/UseAlert';
import { useDispatch , useSelector } from 'react-redux';
import  { authAction } from '../../../store/appSlice';
import styled from 'styled-components';


// import { LoginUser , LoginPassword } from '../../icon/Icon'; 

// 인증로직
import LoginInput from '../../ui/LoginInput';

const LoginStyle = styled.form`
   input{
        width: 100%;
        border: 1px solid #c6c6c6;
        border-radius: 3px;
        padding: 10px;
        font-size:14px;
    }

    label{
        position: relative;
        margin-bottom: 20px;
        &::after{
            position: absolute;
            left: 5px;
            top: -10px;
            padding: 0px 5px;
            font-size: 12px;
            background:#fff;
            font-weight: bold;
        }
    }

    label:first-child{
        &::after{
            content: "Admin ID";
        }
    }

    label:nth-child(2){
        &::after{
            content: "password";
        }
    }

    button{
        width: 100%;
        background: #000;
        color: #fff;
        padding: 10px;
        border-radius: 5em;
        margin-bottom: 10px;
    }
`

export default function LoginForm(){
    const dispatch = useDispatch();
    // const showAlert = useAlert();

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
            clearTimeout(debounce);
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
            const resultData = await response.json();
    
            if(!response.ok){
                throw new Error(resultData.message);
            }
            console.log(response.status);
            if(!resultData.Auth || resultData.token === undefined){
                throw new Error(resultData.message);
            }
            // 토큰 저장
            localStorage.setItem('token', resultData.token);

            // 로그인 상태 업데이트 
            dispatch(authAction.login());

            // 로그인 OK
            // showAlert('로그인 되었습니다.' , 1 );

            // 완료시에만 로그인 팝업 닫기
            // popupClose();       

        }
        catch(error){
            console.error(error);
            // showAlert(error.message);
            // popupClose();
        }
    }
    
    return(
        <>
           <LoginStyle onSubmit={onSubmitHandler}>
                <label>
                    {/* <LoginUser size={30}/> */}
                    <LoginInput
                        type = 'text'
                        dataType = 'id'
                        holder = '아이디'
                        setFormData = {setLoginData}
                        FormData = {loginData}
                    />
                    {isIdValid && 'error'}
                </label>

                <label>     
                    {/* <LoginPassword size={30}/> */}
                    <LoginInput
                         type = 'password'
                         dataType = 'pw'
                         holder = 'password'
                         setFormData = {setLoginData}
                         FormData = {loginData}
                    />
                    {isPwValid && 'error'}
                </label>

                <button
                    disabled={!fromValid}
                >login</button>
            </LoginStyle>
        </>
    )
}


