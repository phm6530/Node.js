import styled from 'styled-components';


const DashBoardTitleStyle = styled.div`
background: linear-gradient(to top, #ffffff, #ffffff, #96c1ff);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    letter-spacing: -4px;
    font-size: 120px;
    font-weight: bold;
`

export default function DashBoardTitle({className ,  children}) {
        return(
            <DashBoardTitleStyle className={className}>{children}</DashBoardTitleStyle>
        )

}