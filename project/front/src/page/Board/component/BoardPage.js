import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';



export default function BoardPage({counter , setPageTouched}){
    const navigate = useNavigate();

    const createPaging = (totalData , DataPerItem) =>{
        const page = Math.ceil(totalData / DataPerItem) ;
        return Array.from({length : page}, (_,idx) => idx + 1);
    }


    const paging = useMemo(() => {
            const limit = 10;
            return createPaging(counter, limit);
    }, [counter]);


    const changePage = async (page) =>{
        setPageTouched(true);
        setTimeout(()=>{
            navigate(`/Board?page=${page}`);
            setPageTouched(false);
        },300);
    };

    return(
    <>
        {
          paging && paging.map((page , idx)=>{
            return <button 
              onClick={()=>changePage(idx+1)} 
              key={idx} 
            >
              {page}
            </button>
          })
          }    
    </>
    )
}