import { Link , useParams } from 'react-router-dom';

export default function BoardDetail(){
    const param = useParams();

    



    return(
        <>
            {param.num} -  NoticeDetail
            <button>
                <Link to='/Board'>목록</Link>
            </button>
        </>
    )
}

