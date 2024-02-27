import styled from 'styled-components'

const SubTitleStyle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
    .subText{
        font-size: 2rem;
        line-height: 1.4em;
        font-weight: bold;
        color: #222;
    }
    img{
        width: 40px;
        margin-right: 10px;
    }
`

const BigSubTitleStyle = styled.div`
    
`


export default function SubTitle({children}){
    return(
        <SubTitleStyle>
            {children}
        </SubTitleStyle>
    )
}

export function BigSubTitle({children}){
    return(
        <BigSubTitleStyle>
            {children}
        </BigSubTitleStyle>
    )
}