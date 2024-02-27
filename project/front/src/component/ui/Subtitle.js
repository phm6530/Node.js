import styled from 'styled-components'

const SubTitleStyle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2.0rem;
    .subText{
        .subTextPoint{
            font-size: 3.5rem;
            padding-top: 50px;
            margin-bottom: 1rem;
        }
        font-size: 2.0rem;
        line-height: 1.7em;
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