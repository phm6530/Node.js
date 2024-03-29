import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {  useEffect, useState } from 'react';
import { InputStyle ,TextAreaStyle } from '../../../../component/ui/TextArea';

// Quill 에디터
import QuillEditor from './Detail/QuillEditor';

import { Controller, useForm } from 'react-hook-form';
import useAuthRedirect from '../../../../component/common/AuthCustum';
import Checkbox from './Detail/CheckBox';
import CustumDatePicker from './Detail/CustumDatePicker';

import alertThunk from '../../../../store/alertTrunk';
// import SubTitle from '../../../../component/ui/Subtitle';

import { addProjectFetch , projectEdit } from '../../ProjectFetch';
import styled from 'styled-components';
import { Button } from '../../../../component/ui/Button';


const projectStack = [ 
    'Html',
    'Css',
    'JavaScript',
    'Node',
    'React',
    'PHP',
    'jQuery', 
    'Scss',
    'Mysql',
    'Next'
];


const FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];


const schema = Yup.object().shape({
    title: Yup.string().required('필수 입력란 입니다.'),
    skill: Yup.array().min(1, '한개 이상의 stack을 등록해주세요'),
    company: Yup.string().required('필수 입력란 입니다.'),
    projectUrl: Yup.string().required('필수 입력란 입니다.').url('Url 형식으로 입력해주세요. 예)https://sitename.com'),
    startDate: Yup.date().max(Yup.ref('endDate'), '시작일은 종료일보다 빨라야 합니다.' ).required('시작일을 입력해주세요'),
    thumbnail: Yup.mixed()
    .required('프로젝트 썸네일을 첨부해주세요.')
    .test('fileSize', '파일 크기가 너무 큽니다. 5MB 이하의 파일을 업로드해주세요.', value => value && value.size <= FILE_SIZE)
    .test('fileFormat', '지원하지 않는 파일 형식입니다. JPG, JPEG, PNG, GIF 파일만 업로드 가능합니다.', value => value && SUPPORTED_FORMATS.includes(value.type)),
    endDate: Yup.date().min(Yup.ref('startDate'), '종료일은 시작일 이후로 설정해주세요').required('종료일을 입력해주세요'),
    description: Yup.string().required('필수 입력란 입니다.').min(6, '6글자 이상써주세요..'),
    projectDescription: Yup.string().required('필수 입력란 입니다.')
});



const AdminProjectStyle = styled.div`
    background: #fff;
    border-radius: 1em;
    padding: 2rem;
`
const InputWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`

const InputLabel = styled.div`
   
    font-weight: 500;
    color:#222;
    font-size: 14px;
    width: 8rem;
`

const FormStyle = styled.form`
    margin-top: 30px;
`

const ProjectSkillWrap = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 80%;

    
`
const CustumInputWrap = styled(InputStyle)`
    flex-grow: 1;
`

const CustumTextAreaStyle = styled(TextAreaStyle)`
    flex-grow: 1;
`

const ButtonWrap = styled.div`
    display: flex;
    
`

const UploadButton = styled.label`
    background: red;
`

export default function AddProject(){
    const { register , handleSubmit  , setValue  , watch , reset ,  formState : { errors } , control }= useForm({
        resolver : yupResolver(schema) , 
        defaultValues: {
            title: '',
            skill: [],
            projectUrl: '',
            description: '',
            projectDescription: '',
            thumbnail : ''
          }
    });

    const { name } =watch('thumbnail');

    console.log(errors);
    // const ctx = useContext(DarkMode);
    // console.log(ctx);
    const [ PROJECT_KEY , SETPROJECT_KEY ] = useState(null);
    const [ Params ] = useSearchParams();
    // console.log('PROJECT_KEY ::::: ',PROJECT_KEY)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Type = Params.get('type');
    const ProjectKey = Params.get('key');


    useEffect(()=>{
        const fetching = async() =>{
            SETPROJECT_KEY(ProjectKey); //기존 KEY
            return await projectEdit(ProjectKey);
        }
        
        if(Type === 'edit'){
            fetching().then(res => {
                reset({
                    idx : res.project_key,
                    title : res.title,
                    company : res.company,
                    description : res.description.replaceAll('<br>','\n'),
                    projectUrl : res.project_url,
                    skill: res.skill.split(','),
                    startDate : new Date(res.startProject),
                    endDate : new Date(res.endProject),
                    projectDescription : res.project_description
                })
                
            }).catch(error => {
                dispatch(alertThunk(error.message , 0))
            })
        }else{
            SETPROJECT_KEY(uuidv4());//신규 생성키
        }

    },[ProjectKey  , Type , dispatch , reset ]);


    // 팝업
    useAuthRedirect('/project'); //project 리턴

    const cancelEvent = () =>{
        navigate(-1);
    } 

    const onSubmitHandler = async(data) => {

        try {
            // const replaceDescription = {...data , description : data.description.replaceAll('\n', '<br>')}
            let setObj;
            if(Type === 'edit'){
                setObj = data;
            }else{
                setObj = {  ...data , idx : PROJECT_KEY  };
            }

            console.log('setObjsetObjsetObjsetObj :::: ',setObj);
            await addProjectFetch(setObj , Type);
            
            dispatch(alertThunk(Type !== 'edit' ? '프로젝트가 등록되었습니다.' : '프로젝트가 수정되었습니다.', true));
            navigate('/project');
            reset(); // 서버 요청이 성공적일 때만 reset 호출

        } catch (error) {
            console.log(error);
            dispatch(alertThunk(error.message , false));
        }
    }


    const fileHandler = (e) =>{
        setValue('thumbnail', e.target.files[0], { shouldValidate: true });
    }

    return(
        <AdminProjectStyle>        
            {/* <SubTitle><span className='subText'>PROJECT - 썸네일</span></SubTitle> */}

            <FormStyle onSubmit={handleSubmit(onSubmitHandler)}>
                
                {/* CustumInputWrap ,TextAreaStyle */}
                <InputWrap>
                    <InputLabel>프로젝트 명 </InputLabel>
                    <CustumInputWrap type="text" 
                        placeholder='프로젝트 명을 입력해주세요.'
                        {...register('title')}
                    />
                    {errors.title && <p className='errorMessage'>{errors.title.message}</p>}
                </InputWrap>

                <InputWrap>
                    <InputLabel>프로젝트 의뢰기관</InputLabel>
                    <CustumInputWrap 
                        {...register('company')}
                        placeholder='프로젝트 의뢰 기간을 입력해주세요.'
                    />
                    {errors.company && <p className='errorMessage'>{errors.company.message}</p>}
                </InputWrap>


          


                
                <InputWrap>
                          {/* date Picker */}
                      <InputLabel>프로젝트 기간</InputLabel>
                        <CustumDatePicker  
                            control={control}  
                            errors={errors}
                            startDateName='startDate'
                            endDateName='endDate'
                        />
                </InputWrap>

                <InputWrap>
                    <InputLabel>프로젝트 기술스택 </InputLabel>
                    <ProjectSkillWrap>
                    {projectStack.map((e)=> (
                            
                            <Checkbox 
                                key={e}
                                label={e}
                                {...register('skill')}
                            />
                            
                            )
                            )
                            
                            }
                    </ProjectSkillWrap>
                    {errors.skill && <p className='errorMessage'>{errors.skill.message}</p>}
                </InputWrap>
 
                <InputWrap>
                    <InputLabel>thumbnail</InputLabel>
                    <UploadButton for='input-file'>업로드</UploadButton>
                    <input type="file" 
                    style={{display:'none'}}
                        id="input-file" 
                        {...register('thumbnail')}
                        onChange={fileHandler}
                    />
                    {name ? name : '파일없음'}
                    {errors.thumbnail && <p className='errorMessage'>{errors.thumbnail.message}</p>}
                </InputWrap>

                <InputWrap>
                    <InputLabel>Site Url</InputLabel>
                    <CustumInputWrap 
                       placeholder='URL을 입력해주세요'
                       {...register('projectUrl')}
                   />

                    {errors.projectUrl && <p className='errorMessage'>{errors.projectUrl.message}</p>}
                </InputWrap>

                <InputWrap>
                    <InputLabel>Contents</InputLabel>
                    <CustumTextAreaStyle {...register('description')}></CustumTextAreaStyle>
                    {errors.description && <p className='errorMessage'>{errors.description.message}</p>}
                </InputWrap>


                {/* Quill Editor */}
                {PROJECT_KEY && (   
                    <>
                        <Controller 
                            name='projectDescription'  
                            control={control}
                            render={({field})=>    
                            <QuillEditor 
                                {...field}
                                PROJECT_KEY={PROJECT_KEY}
                            />
                        }
                        />
                        {errors.projectDescription && <p className='errorMessage'>{errors.projectDescription.message}</p>}
                        
                    </>

                    )
                }


             
                <ButtonWrap>
                    <Button.Submit>등록</Button.Submit>
                    <Button.Cancle
                        type='button'
                        onClick={cancelEvent}
                    >취소</Button.Cancle>
                </ButtonWrap>
            </FormStyle>
      
            
        </AdminProjectStyle>
    )
}