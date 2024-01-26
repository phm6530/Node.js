import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import * as Yup from 'yup';
import { Controller, useForm , useWatch } from 'react-hook-form';
import useAuthRedirect from '../../component/common/AuthCustum';
import Checkbox from './component/CheckBox';

// 
import { DUMMY_PROJECT } from './DUMMY_DATA';


const initalList = [ '퍼블리싱' , '기획' , '개발' ]
const projectStack = [ 'Node.js' , 'Next.js' , 'Css' , 'Html' , 'JavaSciprt' , 'PHP' , 'MySql', 'Scss'];

const schema = Yup.object({
    project_name : Yup.string().required('필수로 입력해주세요.'),
    project_stack : Yup.array().min(1 , '한개 이상의 stack을 등록해주세요'),
    project_contents : Yup.string().required('필수로 입력해주세요.').min(10, '10글자 이상써주세요')
});

export default function AddProject(){
    const { register , handleSubmit  , reset , formState : { errors }  }= useForm({
        resolver : yupResolver(schema) , 
        defaultValues: { project_stack: [] }
    });

    // register: 폼 필드를 React Hook Form에 연결하는 함수입니다. 
    //이 함수는 ref를 반환하며, 이를 통해 폼 필드와 React Hook Form의 내부 상태가 연결됩니다.

    // handleSubmit: 폼 제출을 처리하는 함수입니다. 
    //이 함수는 두 개의 콜백 함수를 인자로 받으며, 
    //첫 번째 콜백은 유효성 검사를 통과한 경우 실행되고, 
    //두 번째 콜백은 유효성 검사에 실패한 경우 실행됩니다.

    // errors: 현재 폼의 유효성 검사 에러를 담고 있는 객체입니다. 
    // 각 필드별로 유효성 검사 실패 시의 에러 메시지를 알 수 있습니다.
    // formState: 폼의 현재 상태 정보를 포함하고 있으며, isSubmitting, isDirty 등의 상태를 확인할 수 있습니다.
    // watch: 지정한 필드 또는 모든 필드의 현재 값을 반환하는 함수입니다.




    useAuthRedirect('/project'); //project 리턴

    // const requestData = async () =>{
    //     try{
    //         const response = await fetch('http://localhost:8080/project');
    //     }
    //     catch(error){

    //     }
    
    // }

    const onSubmitHandler = (data) =>{
        const setObj = { idx : DUMMY_PROJECT.length + 1 , title : data.project_name ,  stack : data.project_stack, contents : data.project_contents}
        const newArray = [...DUMMY_PROJECT , setObj ]
        console.log(newArray);
        reset();
    }

    return(
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <h1>Proejct - Add Page</h1>

                <div>
                    <span>프로젝트 명 </span><br></br>
                    <input type="text" {...register('project_name')}/>
                    {errors.project_name && <p>{errors.project_name.message}</p>}
                </div>

                <div>
                    <span>프로젝트 기술스택 </span><br></br>
                    {projectStack.map((e)=> <Checkbox 
                        key={e}
                        label={e}
                        {...register('project_stack')}
                    />)}
                    {errors.project_stack && <p>{errors.project_stack.message}</p>}
                </div>

                <div>
                    <span>Contents</span>
                    <textarea {...register('project_contents')}></textarea>
                    {errors.project_contents && <p>{errors.project_contents.message}</p>}
                </div>
                

                <button type='submit'>등록</button>
            </form>
        </>
    )
}