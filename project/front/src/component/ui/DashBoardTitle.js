import styled from 'styled-components';


const DashBoardTitleStyle = styled.div`
    /* background: -webkit-linear-gradient(to right, #000000, #2d3f60); */
    background: linear-gradient(to right top, #e2e6ef, #e2e6ef, #9db8e8);
    /* background: linear-gradient(to right, #000000, #2d3f60); */
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    letter-spacing: -4px;
    font-size: 100px;
    font-weight: bold;
    /* padding-top: 200px; */
    b{
        
    }

`

export default function DashBoardTitle({children}) {
        console.log(children);
        return(
            <DashBoardTitleStyle>{children}</DashBoardTitleStyle>
        )

}