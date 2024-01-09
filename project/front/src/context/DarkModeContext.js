import { createContext, useState } from 'react';

// 초기값은 value값이 없을때 리턴하는 거임
const DarkMode = createContext()

const Mode = (props) =>{

    const [modeState , setModeState ] = useState(()=>{
        const store = localStorage.getItem('darkMode');
        return store === 'true' ? true : false;
    });

    const toggleMode = () =>{
        setModeState(prev => {
            const modeChange = !prev;
            localStorage.setItem('darkMode' , modeChange);
            return modeChange;
        });   
    }

    const darkModeValue = {
        darkMode : modeState,
        toggleMode : toggleMode
    }

    return(
        <>
            <DarkMode.Provider value={darkModeValue}>
                {props.children}
            </DarkMode.Provider>
        </>
    )
}


export { Mode , DarkMode }