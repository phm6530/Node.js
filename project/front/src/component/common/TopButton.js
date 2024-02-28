import styled , {keyframes} from 'styled-components'
import { GoMoveToTop } from "react-icons/go";
import { useEffect, useState } from 'react';

const enabledAni = keyframes`
    from{
        bottom: 0;
    }
    to{
        bottom: 2rem;
    }
`
const disabledAni = keyframes`
    from{

    }
    to{

    }
`

const TopButtonStyle = styled.div`
    position: fixed;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: red;
    z-index: 9999;
    cursor: pointer;
    border-radius: 100%;
    background: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        font-size: 35px;
        color: #fff;
    }
    animation: ${enabledAni} .5s ease forwards;
`
function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }
  
export default function TopButton(){
    const [ show , setShow ] = useState(false);
    const TopButtonHadnler = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'}); // 스크롤을 부드럽게
    }
    

    useEffect(() => {
        const heightFunc = debounce(() => {
            const target = window.scrollY;
            if (target > 500) {
                setShow(true);
            } else {
                setShow(false);
            }
        }, 500); // 100ms 디바운싱 시간

        window.addEventListener('scroll', heightFunc);
        return () => {
            window.removeEventListener('scroll', heightFunc);
        }
    }, []);
    
    
    return(
        <>
        {show  && 
            <TopButtonStyle 
                $show={show}
                onClick={()=>TopButtonHadnler()}>
                <GoMoveToTop/>
            </TopButtonStyle>
        }
            
        </>
    )
}