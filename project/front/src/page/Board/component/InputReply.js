import classes from './InputReply.module.css';

const MSG = {
    1 : '댓글은 10글자 이상 등록해주세요!',
    2 : '비밀번호는 4글자 이상 등록해주세요',
    3 : '작성자는 2글자 이상 등록해주세요',
    4 : '빈칸 확인해주세요'
}

export default function InputReply(props){
    const { inputTitle, type , inputName , reply , setReply } = props;

    let inputValid;
    const touched = reply[inputName].touched;
    
    let errorMessage = '';

    if(type === 'password' && reply[inputName].value.length < 4){
        inputValid = false;
        errorMessage = MSG[2]; 
    }
    else if(type !== 'password'){
        inputValid = reply[inputName].value.trim() === '';
        errorMessage = MSG[4];
    }else{
        inputValid = true;
    }


    console.log(inputValid);
    
    const onChnageHandler = (type, value) =>{
        setReply(prev => ({
            ...prev , [type] : {...prev[type] , value }
        }))
    }
    
    const touchedHandler = (type) =>{
        setReply(prev =>({
            ...prev, [type] : {...prev[type] , touched : true}
        }))
    }

    const isInValid = inputValid && touched;

    
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
            {isInValid && <p className={classes.error}> {errorMessage} </p>}
        </>
    )
}




