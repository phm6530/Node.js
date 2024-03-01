import { forwardRef, useContext  } from 'react';
import styled from 'styled-components';
import { DarkMode } from '../../../../../context/DarkModeContext';
import { InputStyle , TextAreaStyle } from '../../../../../component/ui/TextArea'; 
import ErrorBubble from '../../../../../component/ui/ErrorBubble';

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
const CommentInput = forwardRef((fields ,ref)=>{
  const { darkMode } = useContext(DarkMode); 
  const { isAuth , label, error,  ...props } = fields;
console.count();
console.log(label);
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

export default CommentInput;

