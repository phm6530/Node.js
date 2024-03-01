import styled from 'styled-components';
import * as Yup from 'yup';

import { forwardRef, useState } from 'react';
import { useForm  , FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


import { deleteFetch } from '../../../BoardFetch'; 
import alertThunk from '../../../../../store/alertTrunk';

// icon
import { DeleteIcon } from '../../../../../component/icon/Icon';
import { FaCircleCheck } from "react-icons/fa6";
import CommentDelete from './CommentDelete';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../../../../../component/popup/Popup';
import Confirm from '../../../../../component/ui/Confirm';
import { useMutation } from 'react-query';



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
    ${props => `background :url(/img/board/${props.$pirture}.jpg)`};
    background-size: cover;

`


const ReplyUserName = styled.div`
        font-weight: bold;
        display: flex;
        align-items: center;
        font-size: 14px;
        svg{
          font-size: 12px;
          margin-left: .4rem;
          color: #40a3a8;
        }
    
`

const ReplyWrap = styled.div`

    margin-bottom: 3px;
    /* border-radius: 1em; */

    margin: 0 1rem;
    border-radius: 1em;
    margin-bottom: 10px;
    padding: 0 10px;
    display: flex;
    position: relative;
    
   
    .replyPicture{
      width: 45px;
      height: 45px;
      margin-right: 20px;
      border-radius: 5em;
      box-shadow: -4px -4px 10px rgb(255, 255, 255), 4px 4px 10px rgba(36, 36, 36, 0.15);
      border: 3px solid rgb(255 255 255);
      box-sizing: border-box;
    }
    .replyHeader{
      display: flex;
      align-items: center;
      justify-content: space-between;
  
    }
    .replyDate{
      font-size: 12px;
      opacity: .5;
    }
    .replyDescription{
      margin-bottom: 10px;
      font-size: 14px;
      word-break: break-all;
      white-space: pre-line;
    }

`

const ReplyBubble = styled.div`
      background-color: #fff;
      padding: 10px 15px;
      border-radius: 0.5em;
      position: relative;
      width: calc(100% - 70px);
       /* ${props => props.$admin && 'background: #fef01b'}; */
      box-shadow: 2px 2px 1px rgba(0,0,0,0.05);
      border: 1px solid rgb(0 0 0 / 8%);
      &::before{
        content: "";
        display: block;
        position: absolute;
        left: -20px;
        top: 15px;
        width: 0;
        height: 0;
        border-bottom: 5px solid transparent;
        border-top: 5px solid transparent;
        border-left: 10px solid rgb(255, 255, 255);
        border-right: 10px solid transparent;
        transform: rotate(180deg);
      }

  `

const CommentItem = forwardRef((props , ref)=>{
    const { login } =useSelector(state => state.authSlice);
    const [ modal ,setModal ] = useState(false);
    const dispatch = useDispatch();
    const { 
        item , 
        selectIdx , 
        setSelectIdx , 
        setUserFetchData ,
        role 
    } = props;

    const { 
        user_icon,
        user_name,   contents ,  date,
        board_key // 식별 board key
    } = item;


    const schema = Yup.object({
        password : login? Yup.string().notRequired() : Yup.string().required('비밀번호를 입력해주세요.')
    })
    
    const {formState : { errors } , ...useFormProps } = useForm({
        resolver : yupResolver(schema),
        defaultValues : {
            password : ''
        }
    });

    const deleteHandler = (key) =>{
        login ? setModal(true) : setSelectIdx(key);
    }
    
    const { mutate }  = useMutation((formData)=>deleteFetch(formData),{
        onSuccess : (data) =>{
            dispatch(alertThunk('삭제되었습니다.', true));
            setUserFetchData(prev => {
                return prev.filter((e)=>{
                    return e.board_key !== data.isDeleted_key
                });
            });
        }
    })

    return(
    <>
    {modal && (
        <Popup closePopup={()=>setModal(false)}>
            <Confirm confirm={() =>mutate({board_key})}/>
        </Popup>
        )
    }

    <ReplyWrap 
        key={board_key} 
        ref={ref}
    >   

        
        <ReplyPicture 
            $pirture={user_icon} 
            className="replyPicture">
        </ReplyPicture>
        
        <ReplyBubble
            $admin={role === 'admin'}
        >
            <div className="replyHeader">
                <ReplyUserName>{user_name}{role === 'admin' && <FaCircleCheck/>}</ReplyUserName>
                    {
                        ( role === 'admin' && !login ) || (
                        <div className='replyDelete'>
                        {!selectIdx && <button onClick={()=>deleteHandler(board_key)}>
                            <HoverStyled>
                                <DeleteIcon size='20' color='#cdcdcd' />    
                            </HoverStyled>
                        </button>}

                            {selectIdx && (
                                    <FormProvider {...useFormProps}>
                                        <CommentDelete
                                            setUserFetchData={setUserFetchData}
                                            board_key={board_key}
                                            setSelectIdx={setSelectIdx}
                                            mutateAsync={mutate}
                                        /> 
                                    </FormProvider>
                                )
                            }
                        </div>
                        )
                    }
            
            
            </div>
        <div className="replyDescription">
            {contents}
        </div>
        <p className='replyDate'>{date}</p> 
        </ReplyBubble>
        
        {errors.password && errors.password.message}
        </ReplyWrap> 
    </>   
    )
})

export default CommentItem;