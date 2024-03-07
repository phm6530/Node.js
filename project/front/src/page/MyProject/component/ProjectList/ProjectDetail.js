import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ProjectWrapStyle } from './Styled/ProjectListStyled';

const QuillData = styled.div`

`

export default function ProjectDetail() {
    const param = useParams();
    const [projectDetail, setProjectDetail] = useState(null);

    const fetchDetail = async () => {
        try {
            const response = await fetch(`http://localhost:8080/project/${param.key}`);
            if (!response.ok) {
                throw new Error('서버 오류');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('fetchDetail 오류:', error.message);
        }
    };

    const { data, error } = useQuery('projectDetail', fetchDetail, {
        onSuccess: (data) => {
            setProjectDetail(data.result);
        }
    });
    console.log(projectDetail);

    const renderHTML = (quillHTML)=>{
        return {__html : quillHTML};
    }

    return (
        <>
            {projectDetail && 
                (
                    <ProjectWrapStyle>
                        제목 : {projectDetail.title}
                        고객사 : {projectDetail.company}
                        시작일 : {projectDetail.startProject}
                        마감일 : {projectDetail.endProject}
                        마감일 : {projectDetail.skill}
                        <QuillData>
                            <div dangerouslySetInnerHTML={renderHTML(projectDetail.project_description)}></div>
                        </QuillData>
                    </ProjectWrapStyle>
  
                ) 
            }
        </>
    );
}