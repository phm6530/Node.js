import { useEffect } from 'react';
import { Link , useLocation , useNavigate} from 'react-router-dom'
import useAlert from '../../component/common/UseAlert';

export default function Notice(){
    const location = useLocation();
    const showAlert = useAlert();
    const navigate = useNavigate();

    // 권한 확인
    // console.log('location :' , location);
    useEffect(()=>{
        if(location.state?.noAuth){
            showAlert('권한이 없거나 서버에 문제가 있습니다.');
            navigate(location.pathname, { replace: true });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location]);
    
    const DUMMY_DATA = [
        {  
            idx : 1 ,
            title : '타이틀 네임',
            date : '2024-01-05'
        },
        {  
            idx : 2 ,
            title : '타이틀 네임',
            date : '2024-01-05'
        },
        {  
            idx : 3 ,
            title : '타이틀 네임',
            date : '2024-01-05'
        },
    ]

    return(
        <>
            {
                DUMMY_DATA.map((Notice_name , idx)=>{
                    return (
                        <p key={idx}>
                            <Link 
                                to={`${Notice_name.idx}`}>
                                {Notice_name.idx}
                                {Notice_name.title}
                            </Link>
                        </p>
                    )
                })
            }
        </>
    )
}