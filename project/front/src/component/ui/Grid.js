import styled from 'styled-components'

const GridStyle = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    
`
const HeaderGridStyle = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding-top: 170px;
`

export default function Gird({children, ...props}){
    return(
        <GridStyle {...props}> {children} </GridStyle>        
    )
}

function HeaderGird({children, ...props}){
    return(
        <HeaderGridStyle {...props}> {children} </HeaderGridStyle>        
    )
}

export {
    HeaderGird
}

