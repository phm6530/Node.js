import { createContext, useState , useEffect} from 'react';
import {createGlobalStyle} from 'styled-components';

// 초기값은 value값이 없을때 리턴하는 거임
const DarkMode = createContext()

    const GlobalStyle = createGlobalStyle`
        body{
            ${props => props.darkMode ? `background: #141414;` : `background: #e2e6ef; `}
            ${props => props.transition ? '' : `transition: background 1.6s  cubic-bezier(0, 0.88, 0, 1.03)`}
        }   
        
        p,span, li{
                color : ${props=>props.darkMode ? `#ffffff` : `#333333`};
                ${props => props.transition ? '' : `transition: color 1.6s cubic-bezier(0, 0.88, 0, 1.03) `
            }
        }
    `    
    
    const Mode = (props) =>{
        const [ transition , setTransition ] = useState(true);

        const [modeState , setModeState ] = useState(()=>{
            const store = localStorage.getItem('darkMode');
            return store === 'true' ? true : false;
        });
        
        useEffect(()=>{
        setTransition(false);
        },[]);



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
            {/* 전역스타일 GlobalStyle */}
            <GlobalStyle darkMode={modeState} transition={transition}/> 
            <DarkMode.Provider value={darkModeValue}>
                {props.children}
            </DarkMode.Provider>
        </>
    )
}


export { Mode , DarkMode }