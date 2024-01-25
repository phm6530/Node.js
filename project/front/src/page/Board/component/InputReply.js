import classes from './InputReply.module.css';

export default function InputReply(props){
    const { inputTitle, type , inputName , reply , setReply } = props;
    const touched = reply[inputName].touched;

    const validCheck = (type, value) => {
        if (type === 'password') {
            return value.length >= 4;
        }
        else if (type === 'contents') {
            return value.trim().length >= 2;
        }
        else {
            return value.trim() !== '';
        }
    }

    const onChnageHandler = (type, value) =>{
        let isValid = validCheck(type, value);

        setReply(prev => ({
            ...prev , [type] : {...prev[type] , isValid , value }
        }))
    }
    
    const touchedHandler = (type) =>{
        setReply(prev =>({
            ...prev, [type] : {...prev[type] , touched : true}
        }))
    }

    const isInValid = !reply[inputName].isValid && touched;
    const passwordInput = inputName === 'password' ? true : false;
    

    return(
        <>  
            <p>{inputTitle} *</p>
            <input 
                className={isInValid ? classes.errorInput : undefined}
                type={type}
                name={inputName}
                value={reply[inputName].value}
                onChange={(e)=>onChnageHandler(inputName , e.target.value)}
                onBlur={()=>touchedHandler(inputName)}
                autoComplete={ passwordInput ? 'on' : 'off'}
            />
            {isInValid && <p className={classes.error}>{reply[inputName].errorMessage}</p>}
            {(!isInValid && touched) && <p className={classes.inputClear}>good</p>}
        </>
    )
}




