import styled, { keyframes } from 'styled-components';

const fadein = keyframes`
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to{
        opacity: 1;
        transform: translateY(0px);
    }
`

const Title = styled.h1`
    font-size: 20px;
    color: red;
    animation: ${fadein} .5s cubic-bezier(0.15, 0.87, 0.24, 0.81);
`;


export default function AniContainer({children}){
    return(
        <>
            <Title>안녕</Title>
            {children}
            aniContainer Test
        </>
    )
}