import { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const fadeInLeft = keyframes`
from {
    opacity: 0;
    transform: translateX(-40px);
}
to {
    opacity: 1;
    transform: translateX(0);
}
`;

const fadeInRight = keyframes`
from {
    opacity: 0;
    transform: translateX(40px);
}
to {
    opacity: 1;
    transform: translateX(0);
}
`;

const fadeInUp = keyframes`
from {
    opacity: 0;
    transform: translateY(40px);
}
to {
    opacity: 1;
    transform: translateY(0);
}
`;

const Component = styled.div`

    width: 50%;
    height: 200px;
    background-color: rgba(255,255,255,.3);
    margin-bottom: 10px;
    opacity: 0;

    ${props => {
        if (props.$visible) {
            switch(props.$position){
                case 'left' :
                    return css`
                        transform: translateX(-40px);
                        animation: ${fadeInLeft} 1s ease-in-out forwards;
                    `;
                case 'right' : 
                return css`
                    transform: translateX(40px);
                    animation: ${fadeInRight} 1s ease-in-out forwards;
                `;
                default : 
                return css`
                    animation: ${fadeInUp} 1s ease-in-out forwards;
                `;
            }
        
        }
    }}
`;



export default function FadeinComponent({position ,children}){
    const ref = useRef();
    const [ visible, setVisible ] = useState(false);

    const slideHandler = (entry) =>{
            entry[0].isIntersecting ? setVisible(true) : setVisible(false);
    }

    // div 관찰
    useEffect(()=>{
        // if(!ref) return;
        // console.log(ref);/
        const view = ref.current;
        const io = new IntersectionObserver(slideHandler);
        io.observe(view);

        return () => io.disconnect(view)
    },[]);  

    return(
        <Component $visible={visible} ref={ref} $position={position}>
            {children}
        </Component>
    )
}