import styled from 'styled-components'

const GridStyle = styled.div`
    width: 1200px;
    margin: 0 auto;
`

export default function Gird({children, ...props}){
    return(
        <GridStyle {...props}> {children} </GridStyle>        
    )
}