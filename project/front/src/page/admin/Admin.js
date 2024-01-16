import useAuthRedirect from '../../component/common/AuthCustum';

export default function Admin(){

    useAuthRedirect('/');
    return(
        <>
            Admin 관리자 페이지
        </>
    )
}