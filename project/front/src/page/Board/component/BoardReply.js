import styled from 'styled-components';
import * as Yup from 'yup';

import { deleteFetch } from '../BoardFetch';
import { useMutation} from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DeleteIcon } from '../../../component/icon/Icon';
import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUser } from "react-icons/fa6";

import alertThunk from '../../../store/alertTrunk';


const schema = Yup.object({
    password : Yup.string().required('비밀번호를 입력해주세요.')
})

const HoverStyle = ({ className, children }) => {
    return <span className={className}>{children}</span>;
};

const HoverStyled = styled(HoverStyle)`
    &:hover {
        // 아이콘에 대한 호버 스타일 정의
        svg {
            fill: rgb(97 124 163); // 예: #ff0000
        }
    }
`;

const ButtonSTyle = styled.button`
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    padding: 2px 5px;

`

const ReplyPicture = styled.div`
    ${props => `background :url(/img/board/${props.$pirture}.png)`};
    background-size: cover;
`
const FormStyle = styled.form`
    background:red;
    box-sizing: border-box;
    border: 2px solid red;
    border-radius: 5em;
    overflow: hidden;
    input{
        width: 80px;
    }

`

const BoardReply = forwardRef((props , ref)=>{
    const { reply , selectIdx , setSelectIdx , setUserData } = props;
    const { 
        user_icon,
        user_name,   contents ,  date,
        board_key // 식별 board key
    } = reply;
    const dispatch = useDispatch();
    const { handleSubmit , formState : { errors } , reset , control } = useForm({
        resolver : yupResolver(schema),
        defaultValues : {
            password : ''
        }
    });


    const { mutateAsync}  = useMutation((formData)=>deleteFetch(formData),{
        onSuccess : (data) =>{
            dispatch(alertThunk('삭제되었습니다.', true));
            setUserData(prev => {
                return prev.filter((e)=>{
                    return e.board_key !== data.isDeleted_key
                });
            });
        }
    })

    
    const onSubmitHandler = async(data) =>{
        const password = data.password;
        const formData ={
            reply_password : password,
            board_key : board_key,
        }
        // console.log('formData :' , formData);
        try{
            await mutateAsync(formData);
        }
        catch(error){
            dispatch(alertThunk(error.message , false));
        }
    }

    return(
    <div className='BoardComment' key={board_key} ref={ref}>
        <ReplyPicture $pirture={user_icon} className="replyPicture"></ReplyPicture>
        <div className="replyContents">

        <div className="replyHeader">
            
                
            <div className='reply_UserName'><FaUser/>{user_name}</div>
            
            <div className='replyDelete'>
            {!selectIdx && <button onClick={()=>setSelectIdx(board_key)}>
                <HoverStyled>
                    <DeleteIcon size='20' color='#cdcdcd' />    
                </HoverStyled>
            </button>}
            {selectIdx && (
                <FormStyle onSubmit={handleSubmit(onSubmitHandler)}>
                    <Controller
                        name='password'
                        control={control}
                        render={({field})=>

                            <input 
                                autoComplete='off'
                                type='password'
                                {...field}
                            />
                        }
                    />

                    <ButtonSTyle type='submit'>확인</ButtonSTyle>

                    <ButtonSTyle type='button' onClick={()=>{
                        setSelectIdx(null);  
                        reset();
                    }}>취소</ButtonSTyle>
                </FormStyle>
            )}
            </div>
        
        </div>
        <div className="replyDescription">
            {contents}
        </div>
        <p className='replyDate'>{date}</p> 
        </div>
        
        {errors.password && errors.password.message}
        </div>    
    )
})

export default BoardReply;