import { useDispatch  } from 'react-redux';
import  { authAction } from '../../../store/appSlice';
import { Button } from '../../ui/Button';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as Yup from 'yup';

import { LoginUser , LoginPassword } from '../../icon/Icon'; 

// 인증로직
import alertThunk from '../../../store/alertTrunk';
import { yupResolver } from '@hookform/resolvers/yup';


const LoginHeaderStyle = styled.div`
    padding-bottom: 30px;
    padding-top:20px;
    text-align: left;
    font-size: 40px;
    font-weight: bold;
    text-shadow: 25px 0px 20px rgba(0,0,0,0.3);
    p{
        font-size:14px;
        font-weight: normal;
        opacity: .5;
    }
`

const LoginHeader = () =>{
    return(
        <LoginHeaderStyle>
            Login
            <p>
                My Portpolio Admin Login<br></br>
            </p>
        </LoginHeaderStyle>
    )
}

const LoginStyle = styled.form`
    button{
        width: 100%;
        color: #fff;
        border-radius: 5em;
        margin-bottom: 10px;
    }
`

const LabelStyle = styled.label`
    position: relative;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    flex-direction: row;
    flex-wrap: wrap;
    &::after{
        position: absolute;
        left: 5px;
        top: -10px;
        padding: 0px 5px;
        font-size: 12px;
        background:#fff;
        font-weight: bold;
    }

    &:first-child{
        &::after{
            content: "Admin ID";
        }
    }

    &:nth-child(2){
        &::after{
            content: "password";
        }
    }

`

const LoginInputStyle = styled.input`   
    padding-left: 10px;
    padding: 10px;
    font-size:14px;
    flex-grow: 1;    
`

const LabelWrap = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.1);

    svg{
        margin-left: 10px;
        opacity: .5;
    }
    ${props=> props.$error && `border : 1px solid #ff0000ad;`}
`
const ErrorMessage = styled.div`
    color: red;
    margin-top: 5px;
    font-size: 12px;
    font-weight: bold;
    opacity: .8;
`


const schema = Yup.object({
    user_id : Yup.string().required('아이디를 적어주세요.'),
    user_password : Yup.string().required('비밀번호를 적어주세요.')
})

export default function LoginForm(){
    const dispatch = useDispatch();
    const { handleSubmit , register , formState : { errors } } = useForm({
        resolver : yupResolver(schema),
    });
    // 디바운싱
    // useEffect(()=>{
    //     const debounce = setTimeout(()=>{
    //         setFormValid(loginData.id.isValid && loginData.pw.isValid);
    //     },500);

    //     return()=>{
    //         clearTimeout(debounce);
    //     }
    // },[loginData]);
        
    // 로그인 로직
    const onSubmitHandler = async (formData) =>{
        
        try{
            const response = await fetch('http://localhost:8080/login', {
                method : "POST",
                headers : {
                    'ConTent-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
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
            dispatch(alertThunk('로그인 되었습니다.' , 1));

            // 완료시에만 로그인 팝업 닫기
            // popupClose();       
        }
        catch(error){
            console.error(error);
            dispatch(alertThunk(error.message, 0));
        }
    }
    
    return(
        <>
           <LoginStyle onSubmit={handleSubmit(onSubmitHandler)}>
                <LoginHeader/>
                <LabelStyle>
                    <LabelWrap $error = {errors.user_id}>
                        <LoginUser size={22}/>
                        <LoginInputStyle 
                       
                            {...register('user_id')}
                            placeholder='Admin Id'
                        />
                        
                    </LabelWrap>
                    {errors.user_id && <ErrorMessage>{errors.user_id.message}</ErrorMessage>}
                </LabelStyle>
               

                <LabelStyle>     
                    <LabelWrap $error = {errors.user_password}>
                        <LoginPassword size={22}/>
                        <LoginInputStyle
                            {...register('user_password')}
                            placeholder='password'
                            type='password'
                        />
                    </LabelWrap>
                    {errors.user_password && <ErrorMessage>{errors.user_password.message}</ErrorMessage>}
                </LabelStyle>
                <Button.Submit>Login</Button.Submit>
                
            </LoginStyle>
        </>
    )
}


