import { useQuery , useMutation, useQueryClient } from 'react-query';
import { useLocation , useNavigate} from 'react-router-dom';
import { findForBadword } from '../../filter/filterWording';
import { v4 as uuidv4 } from 'uuid';
import { fetchReply , fetchData } from './BoardFetch';

import BoardReplyForm from './component/BoardReplyForm';
import BoardView from './component/BoardVIew';
import useAlert from '../../component/common/UseAlert';
import * as Yup from 'yup';

// import { dateFormating } from '../../component/common/DateFormat';

import { useForm , FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; // Yup + form hook 연동

const schama = Yup.object({
    userName : Yup.string().required('필수항목 입니다.'),
    contents : Yup.string().required('필수항목 입니다.').min(10, '최소 10글자 이상 적어주세요'),
    password : Yup.string().required('필수항목 입니다.').min(4, '최소 4글자의 비밀번호를 기재해주세요')
})

export default function Board(){
    const navigate = useNavigate();
    const showAlert = useAlert(); // 팝업 커스텀 훅
    const location = useLocation();

    // React-hook-form
    const formMethod = useForm({
        resolver : yupResolver(schama) ,
        defaultValues : {
            userName : '',
            contents : '',
            password : ''
        }
    });

    // 초기데이터 + 페이징 데이터 로드
    const page = +new URLSearchParams(location.search).get('page') || 1;

    const { data, isLoading , isError } = useQuery(
        ['board', page], () => fetchData(page), {
            refetchOnWindowFocus: false,
            onError: (error) => {
                console.log('실행');
                showAlert(error.message, 0);
            }

        }
    ); 

    // QueryClient 연결
    const queryClient = useQueryClient();

    // Query 뮤테이션
    const mutation = useMutation(formData => fetchReply(formData), {
        onSuccess: (data) => {
            queryClient.invalidateQueries('board');

            showAlert('댓글이 등록되었습니다.' , 1);
            navigate('/board?page=1');

            formMethod.reset();
        },
        onError : (error)=>{
            showAlert(error.message , 0);
        }
    });


    // submit
    const onSubmitHandlr = async(data) =>{
        console.log(data);

        if(!findForBadword(data.contents)){
            showAlert('비속어는 입력 불가합니다..' , false );
            return;
        }

        const formData = {
            idx : uuidv4(),
            ...data ,
            page : new URLSearchParams(location.search).get('page') || 1 ,
        }
        mutation.mutate(formData); 
    }   
    


    return(
        <>  
        {/* formProvider */}
        <FormProvider {...formMethod}>
            {/* view or Page */}
            {(!isLoading && !isError ) && (
                <>
                    <BoardView
                        board={data}
                    /> 

                    {/* Form */}
                    <BoardReplyForm
                        onSubmitHandlr={onSubmitHandlr}
                    />
                </>
            )
            }
            {isLoading && 'loading....'}
            {(!isLoading && isError) && 'error'}
            
        </FormProvider>
        </>
    )
}




