import { yupResolver } from '@hookform/resolvers/yup';

import { useForm} from 'react-hook-form';
import useAuthRedirect from '../../component/common/AuthCustum';
import Checkbox from './component/CheckBox';

//
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import CustumDatePicker from './component/CustumDatePicker';
import 'react-datepicker/dist/react-datepicker.css';

// 

import { useNavigate, useSearchParams } from 'react-router-dom';
import { addProjectFetch } from './ProjectFetch';
import { useDispatch } from 'react-redux';
import alertThunk from '../../store/alertTrunk';
import Gird from '../../component/ui/Grid';
import DashBoard from '../../component/ui/DashBoard';
import { useEffect } from 'react';

import { projectEdit } from './ProjectFetch';

const projectStack = [ 'Node' , 'Next' , 'Css' , 'Html' , 'JavaSciprt' , 'React', 'PHP' , 'MySql', 'Scss' , 'jquery'];

const schema = Yup.object().shape({
    title: Yup.string().required('필수 입력란 입니다.'),
    skill: Yup.array().min(1, '한개 이상의 stack을 등록해주세요'),
    company: Yup.string().required('필수 입력란 입니다.'),
    projectUrl: Yup.string().required('필수 입력란 입니다.').url('Url 형식으로 입력해주세요. 예)https://sitename.com'),
    startDate: Yup.date().max(Yup.ref('endDate'), '시작일은 종료일보다 빨라야 합니다.' ).required('시작일을 입력해주세요'),
    endDate: Yup.date().min(Yup.ref('startDate'), '종료일은 시작일 이후로 설정해주세요').required('종료일을 입력해주세요'),
    description: Yup.string().required('필수 입력란 입니다.').min(6, '6글자 이상써주세요..')
});


export default function AddProject(){
    const { register , handleSubmit  , reset ,  formState : { errors } , control }= useForm({
        resolver : yupResolver(schema) , 
        defaultValues: {
            title: '',
            skill: [],
            projectUrl: '',
            description: ''
          }
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ Params ] = useSearchParams();
    const Type = Params.get('type');
    const ProjectKey = Params.get('key');

    useEffect(()=>{
        const fetching = async() =>{
            return await projectEdit(ProjectKey);
        }
        if(Type === 'edit'){
            fetching().then(res => {
                console.log(res);
                reset({
                    key : res.project_key,
                    title : res.title,
                    company : res.company,
                    description : res.description.replaceAll('<br>','\n'),
                    projectUrl : res.project_url,
                    skill: res.skill.split(','),
                    startDate : new Date(res.startProject),
                    endDate : new Date(res.endProject),
                })
                
            }).catch(error => {
                dispatch(alertThunk(error.message , 0))
            })
        }
    },[ProjectKey  , Type , dispatch , reset ]);


    // 팝업
    useAuthRedirect('/project'); //project 리턴

    const cancelEvent = () =>{
        navigate(-1);
    } 

    const onSubmitHandler = async(data) => {

        console.log('data :',data);  
        try {
            // const replaceDescription = {...data , description : data.description.replaceAll('\n', '<br>')}
            let setObj;
            if(Type === 'edit'){
                setObj = data;
            }else{
                setObj = { idx : uuidv4() , ...data };
                
            }
            await addProjectFetch(setObj , Type);
            
            dispatch(alertThunk(Type !== 'edit' ? '댓글이 등록되었습니다.' : '댓글이 수정되었습니다.', true));
            navigate('/project');
            reset(); // 서버 요청이 성공적일 때만 reset 호출
            
        } catch (error) {
            console.log(error);
            dispatch(alertThunk(error.message , false));
        }
    }

    return(
        <>  
        <DashBoard/>
    
        <Gird>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <h1>Proejct - Add Page</h1>

                <div>
                    <span>프로젝트 명 </span><br></br>
                    <input type="text" 
                        {...register('title')}
                    />
                    {errors.title && <p className='errorMessage'>{errors.title.message}</p>}
                </div>

                <div>
                    <span>프로젝트 의뢰기관</span>
                    <input {...register('company')}></input>
                    {errors.company && <p className='errorMessage'>{errors.company.message}</p>}
                </div>


                {/* date Picker */}
                <CustumDatePicker  
                    control={control}  
                    errors={errors}
                    label='프로젝트 제작기간'
                    startDateName='startDate'
                    endDateName='endDate'
                />


                <div>
                    <span>프로젝트 기술스택 </span><br></br>
                    {projectStack.map((e)=> <Checkbox 
                        key={e}
                        label={e}
                        {...register('skill')}
                    />)}
                    {errors.skill && <p className='errorMessage'>{errors.skill.message}</p>}
                </div>
 
                <div>
                    <span>Site Url</span>
                    <input {...register('projectUrl')}></input>
                    {errors.projectUrl && <p className='errorMessage'>{errors.projectUrl.message}</p>}
                </div>

                <div>
                    <span>Contents</span>
                    <textarea {...register('description')}></textarea>
                    {errors.description && <p className='errorMessage'>{errors.description.message}</p>}
                </div>
                

                <button type='submit'>등록</button>
                <button type='button' onClick={()=>cancelEvent()}>취소</button>
            </form>
        </Gird>
        </>
    )
}