import DashBoard from '../../component/ui/DashBoard'
import Gird from '../../component/ui/Grid'
import styled from 'styled-components'
import BannerCommon from '../../component/ui/BannerCommon'
import DashBoardTitle from '../../component/ui/DashBoardTitle'
import Calendar from './component/Calendar'

const CalenaderGrid = styled(Gird)`
    padding-top: 150px;
`

const PageSubText = styled.div`
    color:#fff;
    font-size: 20px;
    margin-bottom: 70px;
    text-shadow: 0px 5px 5px rgba(0,0,0,.4);
    p{
        font-size: 14px;
        color: #fff;
        opacity: .7;
        padding-top: 20px;
    }
`

export default function Todolist(){

    return(
        <>
            <DashBoard page={'Calendar'}></DashBoard>
            
            <CalenaderGrid>

                {/* header */}
                <BannerCommon.BannerPoint>
                    <img src="img/calendar.png" alt="calendar" />
                    MY STUDY
                </BannerCommon.BannerPoint>

               <DashBoardTitle><b>MY STUDY</b></DashBoardTitle>
               <PageSubText>
                웹 퍼블리셔 4년차, 프로젝트 활동을 기록합니다. <br></br>더 넓은 지식을 위해 React, Node.js를 학습 중에 있습니다.<br></br>
                <p>*전 회사의 공개 가능한 프로젝트 / 개인 작업물만 공유합니다.</p>
                </PageSubText> 


                {/* body */}
                <Calendar/>
                
            </CalenaderGrid>
        </>
    )
}