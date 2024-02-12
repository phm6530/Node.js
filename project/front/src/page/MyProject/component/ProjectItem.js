import styled from 'styled-components'
import StackIcon from '../../../component/icon/StackIcon'
import { CiCalendar } from "react-icons/ci";
import Fadein from '../../../FadeinComponent';
import { useNavigate } from 'react-router-dom';
import { projectDelete } from '../ProjectFetch';
import { useMutation, useQueryClient } from 'react-query';

const SKILL_ICON = {
    Html : <StackIcon.Html label={'Html'}/>,
    Css : <StackIcon.Css label={'Css'}/>,
    JavaSciprt : <StackIcon.Js label={'JavaSciprt'}/>,
    Node : <StackIcon.Node label={'Node.js'}/>,
    React : <StackIcon.React label={'React'}/>,
    PHP : <StackIcon.Php label={'Php'}/>,
    jquery : <StackIcon.Jquery label={'jQuery'}/>,
    Scss : <StackIcon.Scss label={'Scss'}/>,
    MySql : <StackIcon.Mysql label={'Mysql'}/>
}



// 공통 CSS
const ProjectContentStyle = styled.div`
    display: flex;
    font-size: 14px;
`
// const ProjectLinkStyle = styled(ProjectContentStyle)`
//     color: #4b80c3;
//     font-style: italic;
//     &:hover{
//         color: #0071ff;
//         text-decoration: underline;
//     }
// `

const ProjectViewStyle = styled.button`
    border: 1px solid rgba(0,0,0,0.2);
    padding: 5px 20px;
    border-radius: 2em;
`

const ProjectFadeinStyle = styled(Fadein)`
        box-shadow: -4px -4px 15px rgba(255, 255, 255, 0.7), 4px 4px 15px rgba(36, 36, 36, 0.15);
        padding: 20px;
        border-radius: 1em;
        margin-bottom: 20px;
`
const ProjectTitle = styled.div`
    font-weight: bold;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
`

const ProjectDescription = styled.div`
    font-size: 14px;
    white-space: pre-line;
    margin: 20px 0;
`

const ProjectControlBtnWrap = styled.div`
    button{
        font-size: 13px;
    }
`


export default function ProjectItem(project){
    const navigate = useNavigate();

    const projectView = (url) =>{
            window.open(url , '_blank');
    }
    const projectChange = (key) =>{
        console.log(key);
        navigate(`/project/add?type=edit&key=${key}`);
    }
    
    const queryClient = useQueryClient();
    const { mutate } = useMutation((deleteKey)=>projectDelete(deleteKey) ,  {
        onSuccess : () =>{
            queryClient.invalidateQueries('project')
        }
    });

    const projectMutation = async(deleteKey) =>{
        await mutate(deleteKey);
    }

    return(
        <>
            <ProjectFadeinStyle>
                {/* <img src="/img/project/jkl.jpg" alt="" /> */}
                <ProjectTitle>
                        {project.title}       

                        <ProjectControlBtnWrap>
                            {/* edit */}
                            <button onClick={()=>projectChange(project.project_key)}>수정</button>
                            <button onClick={()=>projectMutation(project.project_key)}>삭제</button>
                        </ProjectControlBtnWrap>
                </ProjectTitle>
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
                <ProjectDescription>{project.description}</ProjectDescription>
                {/* <a href={project.project_url} rel="noopener noreferrer" target='_blank'><IoIosLink/></a> */}
                <ProjectViewStyle onClick={()=>projectView(project.project_url)}>VIEW</ProjectViewStyle>
            </ProjectFadeinStyle>
        </>
    )
}
