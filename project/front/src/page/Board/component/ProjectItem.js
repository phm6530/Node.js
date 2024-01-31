
export default function ProjectItem(project){
    
    return(
        <>
            <div className='myScroll'>
                <div>{project.id}</div>
                <div>{project.title}</div>
                <div>
                {
                    project.skill &&  project.skill.map((e, idx)=>{
                        return <span key={idx}>{e}</span>
                    })
                }
                </div>
                
                <div>
                    <a href={project.project_url} rel="noopener noreferrer" target='_blank'>{project.project_url}</a>
                </div>
                <div>
                    {project.startProject} - {project.endProject}
                </div>
                <div>{project.description}</div>
            </div>
        </>
    )
}
