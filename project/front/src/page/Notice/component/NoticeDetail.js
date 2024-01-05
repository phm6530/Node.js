import { Link , useParams } from 'react-router-dom';


export default function NoticeDetail(){
    const param = useParams();

    return(
        <>
            {param.num} -  NoticeDetail
            <button>
                <Link to='/notice'>목록</Link>
            </button>
        </>
    )
}