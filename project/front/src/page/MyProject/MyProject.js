import { useState , useRef, createRef } from 'react';
import ProjectSeach from './component/ProjectSeach'; // 검색 컴포넌트


import { projectFetch } from './ProjectFetch';
import { useQuery } from 'react-query';
import ProjectItem from '../Board/component/ProjectItem';

import styled, { keyframes , css }  from 'styled-components';

const fadein = keyframes`
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to{
        opacity: 1;
        transform: translateY(0px);
    }
`

const Test = styled.div`
  background-color: rgba(255,255,255,0.2);
  height: 200px;
  margin-bottom: 10px;
  color: #fff;

  ${({ visible }) =>
    visible ?
    css`
      animation: ${fadein} 1s ease-in-out;
    `
    : undefined
    
    };
`;



export default function MyProject(){

    const [ project , setProject ] = useState([]);
    const [ isVisible , setIsVisible ] = useState([]);
    const ref = useRef((item)=>createRef)
    console.log(ref);
    console.log(isVisible);
    const { data , isLoading , isFetching , isError} = useQuery('project' , projectFetch,{
        onSuccess : (data)=>{
            const responseData = data?.resData || [];        
            setProject(responseData);
            setIsVisible(Array(responseData.length).fill(false))
        },
        refetchOnWindowFocus: false
    });


    // useEffect(() => {
    //     const io = new IntersectionObserver((entries, observer) => {
    //         entries.forEach((entry, index) => {
    //             if (entry.isIntersecting) {
    //                 console.log(index)
    //                 setIsVisible(prev =>{
    //                     let newArray = {...prev}
    //                     newArray[index] = true;
    //                     return newArray;
    //                 })
    //             }
    //         });
    //     });

    //     const wrappers = document.querySelectorAll('.wrapper');
    //     wrappers.forEach((wrapper) => {
    //         io.observe(wrapper);
    //     });

    //     return () => {
    //         wrappers.forEach((wrapper) => io.unobserve(wrapper));
    //         io.disconnect();
    //     };
    // }, []); 


    return(
        <>  
        {
            isVisible.map((e , idx)=>{
                return <Test key={idx} className='wrapper' ref={ref.current[idx]}>{e}</Test>
                }
            )
        }
            
               
        {(!isLoading && !isFetching && !isError )&& (
            <>
            
            {project.length === 0 && '검색 결과 없습니다.'}
            {

            project.map((project)=>
                <ProjectItem        
                    {...project}
                    key={project.project_key}
                /> 
            )
            
            }

            <ProjectSeach 
                data = ''
                realData={data}
                seachData={project}
                // setProject = {setProject}
            />

            </>
        )}
          
        </>
    )
};