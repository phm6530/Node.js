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
    ${props => {
        if (props.$visible) {
            switch(props.$position){
                case 'left' :
                    return css`
                        transform: translateX(-40px);
                        animation: ${fadeInLeft} .5s ease forwards;
                    `;
                case 'right' : 
                return css`
                    transform: translateX(40px);
                    animation: ${fadeInRight} .5s ease forwards;
                `;
                default : 
                return css`
                    animation: ${fadeInUp} .5s ease forwards;
                `;
            }
        
        }
    }}
`;



export default function FadeinComponent({position ,children , idx}){
    const ref = useRef();
    const [ visible, setVisible ] = useState(false);

    const slideHandler = (entry) =>{
            entry[0].isIntersecting && setVisible(true) ;
    }

    // div 관찰
    useEffect(()=>{
        // if(!ref) return;
        // console.log(ref);/
        const view = ref.current;
        const io = new IntersectionObserver(slideHandler , { threshold: .5});
        io.observe(view);

        return () => io.disconnect(view)
    },[]);  

    return(
        <Component $visible={visible} ref={ref} $position={position}>
            {children}
        </Component>
    )
}