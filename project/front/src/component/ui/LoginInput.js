import { useState , useCallback} from 'react';

export default function LoginInput(props){
    const [ value, setValue ] = useState('');

    const { 
        type , 
        dataType , 
        holder , 
        setFormData,
    } = props;

    const onChangehandler = useCallback((type , value ) =>{
        setValue(value);
        const isValid = value.trim !== '' && value.length >= 6;
        setFormData(prev => ({
            ...prev , [type] : {...prev[type] , isValid ,value }
        }));
    },[setFormData])

    const onblurHandelr = useCallback((type) =>{
        setFormData(prev => ({
            ...prev , [type] : {...prev[type] , touched : true }
        }));
    },[setFormData])

    return(
        <>
            <input 
                type={type}
                placeholder={holder}
                onChange={(e)=>onChangehandler(dataType , e.target.value)}
                onBlur={()=>onblurHandelr(dataType)}
                value={value}
                autoComplete={dataType && 'pw'}
            />
        </>
    )
}