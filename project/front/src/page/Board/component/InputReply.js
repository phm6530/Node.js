import { forwardRef, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { DarkMode } from '../../../context/DarkModeContext';


const errorAnimation = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`

const ErrorStyle = styled.div`
    color: red;
    background: #fff;
    padding: 4px 10px;
    border-radius: 10px;
    position: absolute;
    display: inline-block;
    top: -24px;
    left: 100px;
    font-size: 13px;
    font-weight: bold;
    box-shadow: 0px 10px 15px rgba(0,0,0,0.2);
    opacity: 1;
    ${props => props.$error}
    animation: ${errorAnimation} .5s ease;

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
    /* border: 1px solid #c6c6c6; */
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 14px;
    margin-bottom: 15px;
    position: relative;
    box-shadow: inset 4px 5px 3px rgba(36, 36, 36, 0.15), 4px 4px 2px rgba(255, 255, 255, 0.5);
    input{
        width: 100%;
    }
    span{
        position: absolute;
        left: 10px;
        top: -10px;
        padding: 0px 10px;
        display: block;
        font-weight: bold;
        transition: background .6s 0.3s cubic-bezier(0, 0.88, 0, 1.03);
        ${props => props.$darkMode ? `background: #000`  : 'background : #e2e6ef'}
    }
`
const InputReply = forwardRef((fields , ref)=>{
  const {darkMode} = useContext(DarkMode); 

    const {label , error} =fields;
    
    return(
        <>  
            <FormInputDiv
                $darkMode={darkMode}
            >
                <span>{label}</span>
                <input
                    {...fields}
                    ref={ref}
                    type={fields.name === 'password' ? 'password' : 'text'}
                    autoComplete='off'
                  
                />
                {error && <ErrorStyle $error={Boolean(error)}>{error.message}</ErrorStyle>}
            </FormInputDiv>
        </>
        
    )
});

export default InputReply;


// export default function InputReply(props){
//     console.log(props);

//     // const { inputTitle, type , inputName , reply , setReply } = props;
//     // const touched = reply[inputName].touched;

//     // const validCheck = (type, value) => {
//     //     if (type === 'password') {
//     //         return value.length >= 4;
//     //     }
//     //     else if (type === 'contents') {
//     //         return value.trim().length >= 2;
//     //     }
//     //     else {
//     //         return value.trim() !== '';
//     //     }
//     // }

//     // const onChnageHandler = (type, value) =>{
//     //     let isValid = validCheck(type, value);

//     //     setReply(prev => ({
//     //         ...prev , [type] : {...prev[type] , isValid , value }
//     //     }))
//     // }
    
//     // const touchedHandler = (type) =>{
//     //     setReply(prev =>({
//     //         ...prev, [type] : {...prev[type] , touched : true}
//     //     }))
//     // }

//     // const isInValid = !reply[inputName].isValid && touched;
//     // const passwordInput = inputName === 'password' ? true : false;
    

//     return(
//         <>  

//             <input type="text" 
                
//             />
//             {/* <p>{inputTitle} *</p>
//             <input 
//                 className={isInValid ? classes.errorInput : undefined}
//                 type={type}
//                 name={inputName}
//                 value={reply[inputName].value}
//                 onChange={(e)=>onChnageHandler(inputName , e.target.value)}
//                 onBlur={()=>touchedHandler(inputName)}
//                 autoComplete={ passwordInput ? 'on' : 'off'}
//             />
//             {isInValid && <p className={classes.error}>{reply[inputName].errorMessage}</p>}
//             {(!isInValid && touched) && <p className={classes.inputClear}>good</p>} */}
//         </>
//     )
// }




