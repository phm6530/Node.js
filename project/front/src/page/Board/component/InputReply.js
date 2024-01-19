import { useState } from 'react';
import classes from './InputReply.module.css';
// import { filterWording } from '../../../filter/filterWording';


export default function InputReply(props){
    const { inputTitle, type , inputName , reply , setReply } = props;

    const [ error , setError] = useState({
        isValid : false , errorMessage : ''
    })
    


    const touched = reply[inputName].touched;

    const validateInput = (type , value) =>{
        if(type === 'password' && value.length < 4){
            setError(prev => ({
                ...prev , 
                isValid : false , 
                errorMessage : '비밀번호는 4글자 이상 등록해주세요'
            }));
            return false;
        }
        else if(value.trim() === ''){
            setError(prev => ({
                ...prev , 
                isValid : false , 
                errorMessage : '빈칸은 입력 불가합니다.'
            }));
            return false;
        }else{
            setError(prev => ({
                ...prev , 
                isValid : true , 
                errorMessage : ''
            }));
            return true;
        }
    }

    const onChnageHandler = (type, value) =>{
        const isValid = validateInput(type , value);
        setReply(prev => ({
            ...prev , [type] : {...prev[type] , value , isValid }
        }))
    }
    
    const touchedHandler = (type) =>{
        setReply(prev =>({
            ...prev, [type] : {...prev[type] , touched : true}
        }))
    }

    const isInValid = !error.isValid && touched;
    
    return(
        <>  
            <p>{inputTitle}</p>
            <input 
                type={type}
                name={inputName}
                value={reply[inputName].value}
                onChange={(e)=>onChnageHandler(inputName , e.target.value)}
                onBlur={()=>touchedHandler(inputName)}
            />
            {isInValid && <p className={classes.error}> {error.errorMessage} </p>}
        </>
    )
}




