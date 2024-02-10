import { forwardRef, useContext, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { DarkMode } from '../../../context/DarkModeContext';
import { useFormContext } from 'react-hook-form';


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
    input,textarea{
        padding: 5px 10px;
        border-radius: 14px;
        background: #f9fafb;
        border: 1px solid #99999966;
        box-shadow: inset -4px -4px 3px rgb(255 255 255 / 23%), inset 4px 4px 2px rgb(147 147 147 / 13%);
        ${props => props.$error && `border: 1px solid #ff6f6f;`}
    }
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
  const { isAuth , ...props } = fields;


    useEffect(() => {
        if (isAuth) {
            setValue(props.name, '관리자'); // 'name' 필드에 '관리자' 값을 설정
        }
    }, [isAuth, props.name, setValue]);

    const {label , error  } =fields;


    return(
        <>  
            <FormInputDiv
                $darkMode={darkMode}
                $error={error}
            >
                <span>{label}</span>

                {
                    
                    fields.type === 'textarea' ?
                    <textarea {...props}></textarea>
                    :
                    <input
                    {...props}
                    ref={ref}
            
                    type={fields.name === 'password' ? 'password' : 'text'}
                    autoComplete='off'
                    
                    // {isAuth && (value = '관리자')}
                    disabled={isAuth}
                />
                }

           
                {error && <ErrorStyle $error={Boolean(error)}>{error.message}</ErrorStyle>}
            </FormInputDiv>
        </>
        
    )
});

export default InputReply;

