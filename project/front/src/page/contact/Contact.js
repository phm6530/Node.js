import DashBoard from '../../component/ui/DashBoard';
import Gird , { HeaderGird } from '../../component/ui/Grid';
import BannerCommon from '../../component/ui/BannerCommon';
import styled from 'styled-components';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import MailComponent from './component/MailComponent';
import ContactButtons from './component/ContactButtons';

const ContactGrid = styled(Gird)`
    position: relative;
    flex-direction: column;
    display: flex;
    width: 100%;
    align-items: flex-start;
`
const PageSubText = styled.div`
    color:#222;
    font-size: 20px;
    margin-bottom: 70px;
    p{
        font-size: 14px;
        opacity: .7;
        padding-top: 20px;
    }
`

const CustumDashBoard = styled(DashBoard)`
`

const PointStyle = styled.div`
    position: absolute;
    right: 100px;
    bottom: 0;
    width: 35%;
`


const LeftComponent = styled.div`
    position: relative;
`

const ContentsWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export default function Contact(){

    return(
        <>
            <CustumDashBoard page={'Contact'}></CustumDashBoard>
            <HeaderGird>
            <BannerCommon.BannerPoint>
                        <img src="img/developer.png" alt="developer" />Contact Me 
                </BannerCommon.BannerPoint>

                <DashBoardTitle><b>CONTACT</b></DashBoardTitle>
            </HeaderGird>

            <ContactGrid>
                <ContentsWrap>
                    
                    <LeftComponent>
                      
                        <PageSubText>
                            맡은 일에 대해 끝까지 노력합니다.<br></br>
                            함께 일하고 싶은 동료가 되겠습니다.
                            <p>@Web publisher / @Front Developer</p>
                        </PageSubText>
            
                        <ContactButtons/>
                    </LeftComponent>

                    <MailComponent/>
                </ContentsWrap>
              
            </ContactGrid> 
        </>
    )
}