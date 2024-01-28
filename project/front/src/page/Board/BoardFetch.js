
// reply Submit 로직
const fetchReply = async(formData) =>{
    const response = await fetch('http://localhost:8080/Board/reply', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
    });
    
    
    if(!response.ok){
        const result = await response.json();
        throw new Error(result.message);
    }
    
    const result = await response.json();
    return result;
}


// 초기 데이터 + 페이징
const fetchData = async (page) => {
    try {
        const response = await fetch(`http://localhost:8080/Board/${page}`);
        
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
   
        return result;

    } catch (error) {
        throw new Error(error.message || '연결 오류')
    }
};

    //댓글 삭제로직
const deleteFetch = async(formData) =>{
    const response = await fetch('http://localhost:8080/board/reply/delete',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(formData)
        })
        
        const result = await response.json();
        console.log(result);

        if(!response.ok){
            throw new Error(result.message);
        }
        return result;
    }

export { fetchReply , fetchData , deleteFetch }