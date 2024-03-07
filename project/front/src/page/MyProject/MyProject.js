import styled from 'styled-components';
import { Outlet} from 'react-router-dom';
import ProfileComponent from '../Board/component/ProfileComponent';

const ProjectWrap = styled.div`
    display: flex;
`
export default function MyProject(){

    return(
        <>  
            {/* Wrap */}
            <ProjectWrap>
                <ProfileComponent/>
                <Outlet/>
            </ProjectWrap>
        </>
    )
};