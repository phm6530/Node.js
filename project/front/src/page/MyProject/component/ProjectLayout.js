import { Outlet } from 'react-router-dom'
import DashBoard from '../../../component/ui/DashBoard';
import BannerCommon from '../../../component/ui/BannerCommon';
import DashBoardTitle from '../../../component/ui/DashBoardTitle';
import Grid from '../../../component/ui/Grid';
import styled from 'styled-components';

const ProjectGird = styled(Grid)`
    padding-top: 25rem;
`

export default function ProjectLayout(){
    return(
        <>
            <DashBoard>
                <BannerCommon.BannerPoint>
                    <img src="/img/developer.png" alt="developer" />My Project
                </BannerCommon.BannerPoint>
                <DashBoardTitle><b>PROJECT</b></DashBoardTitle>
            
            </DashBoard>
        
            <ProjectGird>
                    {/* 하위컴포넌트들  */}
                    <Outlet/>
            </ProjectGird>
        </>
    )
}