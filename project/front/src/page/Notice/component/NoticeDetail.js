import { Link , useParams } from 'react-router-dom';
import useAuthRedirect from '../../../component/common/AuthCustum';



export default function NoticeDetail(){
    const param = useParams();
    useAuthRedirect('/notice');
    return(
        <>
            {param.num} -  NoticeDetail
            <button>
                <Link to='/notice'>목록</Link>
            </button>
        </>
    )
}

