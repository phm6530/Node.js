import styled from 'styled-components'
import ContactButtons from '../contact/component/ContactButtons'

const LeftComponent = styled.div`
    position: sticky;
    height: 100%;
    top: 100px;
    
`
const PageSubText = styled.div`
    color:#222;
    font-size: 18px;
    margin-bottom: 70px;
    p{
        font-size: 14px;
        opacity: .7;
        padding-top: 20px;
    }
`



export default function CommonNav(){

    return(
        <LeftComponent>                      
        <PageSubText>
            맡은 일에 대해 끝까지 노력합니다.<br></br>
            함께 일하고 싶은 동료가 되겠습니다.
            <p>@Web publisher / @Front Developer</p>
        </PageSubText>

        {/* 버튼 컴포넌트 */}
        <ContactButtons/>
        </LeftComponent>
    )

}