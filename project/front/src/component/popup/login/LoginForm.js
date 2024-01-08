import { LoginUser , LoginPassword } from '../../icon/Icon';
import { useState } from 'react';
import LoginInput from '../../ui/LoginInput';

export default function LoginForm(){
    const [ loginData , setLoginData ] = useState(
        {   
            id : { value : '' , isValid : false , touched : false },
            pw : { value : '' , isValid : false , touched : false }
        }    
    );  
    const isFormDataValid = loginData.id.isValid && loginData.pw.isValid;
    // console.log('form Data : ',isFormDataValid);

    const onSubmitHandler =(e) =>{
        e.preventDefault();
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
                </label>

                <label>                    
                    <LoginPassword size={30}/>
                    <LoginInput
                         type = 'password'
                         dataType = 'pw'
                         holder = 'password'
                         setFormData = {setLoginData}
                    />

                </label>

                <button
                    disabled={!isFormDataValid}
                >로그인</button>
            </form>
        </>
    )
}