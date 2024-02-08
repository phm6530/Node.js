import { deleteFetch } from '../BoardFetch';
import useAlert from '../../../component/common/UseAlert';

import { useMutation, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DeleteIcon } from '../../../component/icon/Icon';
import styled from 'styled-components';
import { forwardRef } from 'react';

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

const ReplyPicture = styled.div`
    ${props => `background :url(/img/board/${props.$pirture}.png)`};
    background-size: cover;
`

const BoardReply = forwardRef((props , ref )=>{
    const { reply , selectIdx , setSelectIdx , setUserData } = props;
    const { 
        user_icon,
        user_name,  idx ,  contents ,  date,
        board_key // 식별 board key
    } = reply;
    
    
    const queryClient = useQueryClient();

    const { handleSubmit , formState : { errors } , reset , control } = useForm({
        resolver : yupResolver(schema),
        defaultValues : {
            password : ''
        }
    });


    const { mutateAsync}  = useMutation((formData)=>deleteFetch(formData),{
        onSuccess : (data) =>{
            setUserData(prev => {
                return prev.filter((e)=>{
                    return e.board_key !== data.isDeleted_key
                });
            });
        }
    })

    const showAlert = useAlert();
    const onSubmitHandler = async(data) =>{
        const password = data.password;
        const formData ={
            reply_password : password,
            board_key : board_key,
        }
        console.log('formData :' , formData);
        try{
            await mutateAsync(formData)
            showAlert('삭제되었습니다.', 1);
        }
        catch(error){
            showAlert(error.message);
        }
    }

    return(
    <div className='BoardComment' key={board_key} ref={ref}>
        <ReplyPicture $pirture={user_icon} className="replyPicture"></ReplyPicture>
        <div className="replyContents">
        <div className="replyHeader">
            
            <p className='reply_UserName'>{user_name}</p>
        <div className='replyDelete'>
        {!selectIdx && <button onClick={()=>setSelectIdx(board_key)}>
            <HoverStyled>
                <DeleteIcon size='20' color='#cdcdcd' />    
                {idx}
            </HoverStyled>
        </button>}
        {selectIdx && (
            <form onSubmit={handleSubmit(onSubmitHandler)}>
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

                <button type='submit'>확인</button>

                <button type='button' onClick={()=>{
                    setSelectIdx(null);  
                    reset();
                    }}>취소</button>
            </form>
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