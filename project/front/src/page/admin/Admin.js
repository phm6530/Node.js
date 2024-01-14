import { useLoaderData } from 'react-router-dom';
import useAuthRedirect from '../../component/common/AuthCustum';
export default function Admin(){
    const data = useLoaderData();
    console.log(data);
    useAuthRedirect('/');
    return(
        <>
            
            Admin 관리자 페이지
        </>
    )
}