
// reply Submit 로직
const fetchReply = async(formData) =>{
    const token = localStorage.getItem('token');

    const Url = `http://localhost:8080/Board/reply${token ? '/auth' : ''}`;
    console.log(Url);
    try{
        const response = await fetch( Url , {
            method : 'POST',
            headers : {
                'Authorization': token ? `Bearer ${token}` : '',
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
        console.log('result : : ',result);
        return result;
    }catch(error){
        throw error;
    }

}


// 초기 데이터 + 페이징
const fetchData = async (page) => {
    const targetIdx = page || 0 ;
    try {
        const response = await fetch(`http://localhost:8080/Board/${targetIdx}`);
        
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || `요청이 실패하였습니다. errorCode :  ${response.status}`);
        }
        return result;

    } catch (error) {
        throw error;
    }
};


//댓글 삭제로직
const deleteFetch = async(formData) =>{
    const token = localStorage.getItem('token');

    try{
        const response = await fetch('http://localhost:8080/board/reply/delete',{
                method: 'POST',
                headers:{
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({...formData , auth : Boolean(token)})
            })

            const result = await response.json();
            if(!response.ok){
                throw new Error(result.message || `요청이 실패하였습니다. errorCode :  ${response.status}`);
            }  
            return result;

        }catch(error){
            throw error;
        }

    }

export { fetchReply , fetchData , deleteFetch }