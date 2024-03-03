import styled from 'styled-components';
import StackIcon from '../../../../component/icon/StackIcon';
import Fadein from '../../../../FadeinComponent';


// icon
import { CiCalendar } from "react-icons/ci";

import { Button } from '../../../../component/ui/Button';
import ProjectItemHeader from './ProjectItemHeader/ProjectItemHeader';

const SKILL_ICON = {
    Html : <StackIcon.Html label={'Html'}/>,
    Css : <StackIcon.Css label={'Css'}/>,
    JavaSciprt : <StackIcon.Js label={'JavaSciprt'}/>,
    Node : <StackIcon.Node label={'Node.js'}/>,
    React : <StackIcon.React label={'React'}/>,
    PHP : <StackIcon.Php label={'Php'}/>,
    jquery : <StackIcon.Jquery label={'jQuery'}/>,
    Scss : <StackIcon.Scss label={'Scss'}/>,
    MySql : <StackIcon.Mysql label={'Mysql'}/>,
    Next : <StackIcon.Next label={'Next'}/>
}



const ProjectDuration = styled.div`
    display: flex;
    align-items: center;
    font-size: 13px;
`

const ProjectFadeinStyle = styled(Fadein)`
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    overflow: hidden;
    display: flex;
    border-bottom: 1px solid rgba(0,0,0,0.1);
`
 
const ProjectImgArea = styled.div`
    /* border-radius: 2em; */
    /* overflow: hidden; */
    width: 35%;
`



// const ProjectSubTitle = styled.p`
//     font-weight: bold;
//     margin-top: 24px;
//     font-size: 14px;
// `

const ProjectCompany = styled.div`
    font-size: 12px;
    opacity: .5;
    margin-bottom: 16px;
`

const ProjectDescription = styled.div`
    font-size: 14px;
    white-space: pre-line;
    padding-bottom: 20px;
    /* border-bottom: 1px solid rgba(0,0,0,0.12); */
`



const ContentsWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.0rem 1rem 1rem 2rem;
    flex-grow: 1;
`

export default function ProjectItem(project){

    const projectView = (url) =>{
            window.open(url , '_blank');
    }

    return(
        <>
      
            <ProjectFadeinStyle>

              
                        <ProjectImgArea>
                            <img src="/img/project/jkl1.jpg" alt="jkl" />
                        </ProjectImgArea>

              
                        <ContentsWrap>
                                {/* Header */}
                                <ProjectItemHeader
                                    project={project}
                                />

                                {/* Company */}
                                <ProjectCompany>{project.company}</ProjectCompany>
                                <div>
                                    <ProjectDescription>{project.description}</ProjectDescription>
                                    {/* <ProjectSubTitle>기술스택</ProjectSubTitle> */}
                                    {   
                                        project.skill &&  project.skill.map((e, idx)=>{
                                            //<StackIcon.Css/>   
                                            return <span key={idx}>{SKILL_ICON[`${e}`] || e}</span>
                                        })
                                    }
                                </div>
{/*                         
                                <ProjectSubTitle>프로젝트 기간</ProjectSubTitle>

                                <ProjectDuration>
                                    <CiCalendar/>
                                    {project.startProject} - {project.endProject}
                                </ProjectDuration> */}

                                <Button.Type onClick={()=>projectView(project.project_url)}>VIEW</Button.Type>
                        </ContentsWrap>
            </ProjectFadeinStyle>
        </>
    )
}