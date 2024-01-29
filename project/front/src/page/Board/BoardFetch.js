
// reply Submit 로직
const fetchReply = async(formData) =>{
    try{
        const response = await fetch('http://localhost:8080/Board/reply', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            if (response.headers.get('Content-Type')?.includes('application/json')) {
                const errorResponse = await response.json();
                
                throw new Error(errorResponse.message || `요청이 실패하였습니다. errorCode :  ${response.status}`);
            } else {
                throw new Error(`요청이 실패하였습니다. errorCode : ${response.status}`);
            }
        }

        const result = await response.json();
        return result;
    }catch(error){
        throw error;
    }

}


// 초기 데이터 + 페이징
const fetchData = async (page) => {
    console.log('page : ',page);
    try {
        const response = await fetch(`http://localhost:8080/Board/${page}`);
        
        if (!response.ok) {
            throw new Error(response.message || `요청이 실패하였습니다. errorCode :  ${response.status}`);
        }
        const result = await response.json();
        return result;

    } catch (error) {
        throw error;
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