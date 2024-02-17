import styled from 'styled-components';


const PagePoint = styled.div`
    background: rgba(0,0,0,0.2);
    display: flex;
    align-content: center;
    padding: 10px 10px;
    align-items: center;
    width: 150px;
    border-radius: 1em;
    color: #fff;
    img{
        width: 30px;
        margin-right: 10px;
    }
`

const BannerPoint = ({children}) =>{
    return(
        <PagePoint>
            {children}
        </PagePoint>
    )
}


export default function BannerCommon({children}){

    return(
        <>
            {children}
        </>
    )
}


BannerCommon.BannerPoint = BannerPoint;