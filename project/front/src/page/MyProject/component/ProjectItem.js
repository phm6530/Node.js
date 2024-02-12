import styled from 'styled-components'
import StackIcon from '../../../component/icon/StackIcon'
import { IoIosLink } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import Fadein from '../../../FadeinComponent';

const SKILL_ICON = {
    Html : <StackIcon.Html label={'Html'}/>,
    Css : <StackIcon.Css label={'Css'}/>,
    JavaSciprt : <StackIcon.Js label={'JavaSciprt'}/>,
    Node : <StackIcon.Node label={'Node.js'}/>,
    React : <StackIcon.React label={'React'}/>,
    PHP : <StackIcon.Php label={'Php'}/>,
    jquery : <StackIcon.Jquery label={'jQuery'}/>
}


const ProjectItemStyle = styled.div`

`
// 공통 CSS
const ProjectContentStyle = styled.div`
    display: flex;
    font-size: 14px;
`
const ProjectLinkStyle = styled(ProjectContentStyle)`
    color: #4b80c3;
    font-style: italic;
    &:hover{
        color: #0071ff;
        text-decoration: underline;
    }
`

const ProjectViewStyle = styled.button`
    border: 1px solid rgba(0,0,0,0.2);
    padding: 5px 20px;
    border-radius: 2em;
`

export default function ProjectItem(project){
    const projectView = (url) =>{
            window.open(url , '_blank');
    }
    return(
        <>
            <Fadein>
                <div>{project.id}</div>
                <div>{project.title}       
                <ProjectLinkStyle>
                    
                </ProjectLinkStyle></div>
                <div>
                {   
                    project.skill &&  project.skill.map((e, idx)=>{
                        //<StackIcon.Css/>   
                        return <span key={idx}>{SKILL_ICON[`${e}`] || e}</span>
                    })
                }
                </div>
          

                <ProjectContentStyle>
                    <CiCalendar/>
                    {project.startProject} - {project.endProject}
                </ProjectContentStyle>
                {/* <a href={project.project_url} rel="noopener noreferrer" target='_blank'><IoIosLink/></a> */}
                <ProjectViewStyle onClick={()=>projectView(project.project_url)}>VIEW</ProjectViewStyle>
                <div>{project.description}</div>
            </Fadein>
        </>
    )
}
