import { forwardRef, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { DarkMode } from '../../../context/DarkModeContext';
import { useFormContext } from 'react-hook-form';
import { InputStyle , TextAreaStyle } from '../../../component/ui/TextArea'; 

const errorAnimation = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`

const ErrorStyle = styled.div`
        color: #ff1818;
        background: #fff;
        padding: 4px 10px;
        border-radius: 10px;
        position: absolute;
        display: inline-block;
        top: -7px;
        right: 0;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0px 15px 15px rgba(0,0,0,0.2);
        opacity: 0;
        animation: ${errorAnimation} .2s ease forwards;
        &:after{
            position: absolute;
            content: "";
            display: block;
            width: 10px;
            height: 10px;
            bottom: -5px;
            z-index: 0;
            left: 40px;
            background:#fff;
            transform: rotate(45deg);
        }
`

const FormInputDiv = styled.div`
    width: 100%;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 15px;
    display: flex;
    position: relative;
    flex-direction: column;

    textarea{
        min-height: 150px;
    }
    input:focus, textarea:focus {
        /* outline : 1px solid red; */
        background: #fff
    }
    
    span{
        left: 10px;
        display: block;
        font-weight: bold;
        width: 80px;
        margin-left: 5px;
        margin-bottom: 1px;
    }
    
`
const InputReply = forwardRef((fields ,ref)=>{
  const {darkMode} = useContext(DarkMode); 
  const { setValue } = useFormContext();
  const { isAuth , label, error, ...props } = fields;

    console.log({...props});
    useEffect(() => {
        if (isAuth) {
            setValue(props.name, '관리자'); // 'name' 필드에 '관리자' 값을 설정
        }
    }, [isAuth, props.name, setValue]);

    return(
        <>  
            <FormInputDiv
                $darkMode={darkMode}
            >
                <span>{label}</span>

                {
                    
                    fields.type === 'textarea' ?

                    <TextAreaStyle 
                        $error={error}
                        {...props}    
                    /> 
                    
                    : 
                    
                    <InputStyle 
                        $error={error}
                        ref={ref}
                        type={fields.name === 'password' ? 'password' : 'text'}
                        autoComplete='off'
                        disabled={isAuth}
                        {...props} 
                    />
                }

           
                {error && <ErrorStyle $error={Boolean(error)}>{error.message}</ErrorStyle>}
            </FormInputDiv>
        </>
        
    )
});

export default InputReply;

