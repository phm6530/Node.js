import { Link } from 'react-router-dom'


export default function Notice(){
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
                DUMMY_DATA.map((Notice_name)=>{
                    return (
                        
                        <Link to={`${Notice_name.idx}`}>
                            {Notice_name.idx}
                        </Link>
                    )
                })
            }
        </>
    )
}