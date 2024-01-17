import useAuthRedirect from '../../component/common/AuthCustum';

export default function NoticeWirte(){
    useAuthRedirect('/Board'); //notice 리턴
    return(
        <>
            <form>
                <p>
                    <span>Title</span>
                    <input type="text" />
                </p>

            </form>
        </>
    )
}