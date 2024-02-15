import styled , { css } from 'styled-components';

const DashBoardStyle = styled.div`
    width: 100%;
    height: 550px;
    background-size: cover;
    /* background: #212123; */
    position: absolute;
    z-index: -1;
    ${props => {
        switch(props.$page){
            case 'project' :
                return css` background: #212123; `
            case 'board' :
                return css`background: #5786d5;`
            default :
                return ''
        }
    } }
`

export default function DashBoard({page ,children}) {
    console.log(page);
    return(
        <DashBoardStyle
            $page={page}
        >{children}</DashBoardStyle>
    )
}