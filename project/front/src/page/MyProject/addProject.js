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

import { useNavigate } from 'react-router-dom';

import { addProjectFetch } from './ProjectFetch';
import { useDispatch } from 'react-redux';
import alertThunk from '../../store/alertTrunk';
import Gird from '../../component/ui/Grid';
import DashBoard from '../../component/ui/DashBoard';

const projectStack = [ 'Node' , 'Next' , 'Css' , 'Html' , 'JavaSciprt' , 'PHP' , 'MySql', 'Scss' , 'jquery'];

const MSG = {
    1 : '필수 입력란 입니다.'
}

const schema = Yup.object().shape({
    title: Yup.string().required(MSG[1]),
    skill: Yup.array().min(1, '한개 이상의 stack을 등록해주세요'),
    company: Yup.string().required('필수 입력란 입니다.'),
    projectUrl: Yup.string().required(MSG[1]).url('Url 형식으로 입력해주세요. 예)https://sitename.com'),
    
    startDate: Yup.date().required('시작일을 입력해주세요'),
    endDate: Yup.date().min(Yup.ref('startDate'), '종료일은 시작일 이후로 설정해주세요').required('종료일을 입력해주세요'),
    description: Yup.string().required(MSG[1]).min(6, '6글자 이상써주세요..')
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

    // 팝업
    useAuthRedirect('/project'); //project 리턴

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

    const cancelEvent = () =>{
        navigate(-1);
    } 

    const onSubmitHandler = async(data) => {
        console.log(data);
        try {
            const setObj = { idx : uuidv4() , ...data };

            const result = await addProjectFetch(setObj);
            console.log(result);
            
            navigate('/project');
            reset(); // 서버 요청이 성공적일 때만 reset 호출
            
        } catch (error) {
            console.log(error);
            dispatch(alertThunk(error.message , 0));
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