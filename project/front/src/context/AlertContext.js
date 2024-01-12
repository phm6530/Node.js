import {createContext, useState } from 'react';

const AlertContext = createContext();

const Alert = ({children}) =>{
    const [ view , setView ] = useState(false);
    const [ alertMessage , setAlertMessage ] = useState('없음');

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
