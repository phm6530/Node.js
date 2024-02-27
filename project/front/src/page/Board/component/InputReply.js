import { forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { DarkMode } from '../../../context/DarkModeContext';
import { useFormContext } from 'react-hook-form';
import { InputStyle , TextAreaStyle } from '../../../component/ui/TextArea'; 
import ErrorBubble from '../../../component/ui/ErrorBubble';

const FormInputDiv = styled.div`
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 10px;
    display: flex;
    position: relative;
    flex-direction: column;
    /* &:last-child{
        margin-bottom: 0;
    } */
    textarea{
        width: 100%;
        min-height: 10px;
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

           
                {error && <ErrorBubble>{error.message}</ErrorBubble>}
            </FormInputDiv>
        </>
        
    )
});

export default InputReply;

