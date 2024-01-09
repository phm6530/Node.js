
export default function MyProject(){
    

    const DUMMY_PROJECT = [
        {
            idx : 1,
            title : '강원랜드 직원 모바일',
            contents : '퍼블리싱',
        },
        {
            idx : 2,
            title : '강원랜드 직원 모바일',
            contents : '퍼블리싱',
        },
    ]

    return(
        <>
            {
                DUMMY_PROJECT.map((project, idx)=>{                    
                    return (
                        <div key={idx}>
                            <div>{project.idx}</div>
                            <div>{project.title}</div>
                            <div>{project.contents}</div>
                        </div>
                    )
                })
            }
        </>
    )
}