import {createContext, useEffect, useState } from 'react';

const AlertContext = createContext();

const Alert = ({children}) =>{
    const [ view , setView ] = useState(false);
    const [ alertMessage , setAlertMessage ] = useState('없음');
    console.log( 'view :', view );

    useEffect(()=>{
        const alert =  setTimeout(()=>{
            setView(false)
        },3000);

        return()=>{
            clearTimeout(alert);
        }
    },[view]);

    return(
        <>
                <AlertContext.Provider value={{view, setView ,alertMessage , setAlertMessage}}>
                    {children}
                </AlertContext.Provider>
        </>
    )
}


export {
    AlertContext,
    Alert
}
