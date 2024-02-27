import DashBoard from '../../component/ui/DashBoard';
import Gird , { HeaderGird } from '../../component/ui/Grid';
import BannerCommon from '../../component/ui/BannerCommon';
import styled from 'styled-components';
import DashBoardTitle from '../../component/ui/DashBoardTitle';
import MailComponent from './component/MailComponent';
import CommonNav from '../common/CommonNav';

const ContactGrid = styled(Gird)`
    position: relative;
    flex-direction: column;
    display: flex;
    padding-top: 80px;
    width: 100%;
    align-items: flex-start;
`

const CustumDashBoard = styled(DashBoard)`
`




const ContentsWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export default function Contact(){

    return(
        <>
            <CustumDashBoard page={'Contact'}>
                <HeaderGird>
                    <BannerCommon.BannerPoint>
                            <img src="img/developer.png" alt="developer" />Contact Me 
                    </BannerCommon.BannerPoint>
                    <DashBoardTitle><b>CONTACT</b></DashBoardTitle>
                </HeaderGird>
            </CustumDashBoard>


            <ContactGrid>
                <ContentsWrap>
                    
                        <CommonNav/>

                    <MailComponent/>
                </ContentsWrap>
              
            </ContactGrid> 
        </>
    )
}