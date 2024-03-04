import styled from 'styled-components'

const SubTitleStyle = styled.div`
    display: flex;
    align-items: center;
    .subText{
        font-size: 2rem;
        line-height: 1.1em;
        font-weight: bold;
        color: #333333;
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