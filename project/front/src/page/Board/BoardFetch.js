
// reply Submit 로직
const fetchReply = async(formData) =>{
    const response = await fetch('http://localhost:8080/Board/reply', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const result = await response.json();
    
    if(!response.ok){
        throw new Error(result.message);
    }

    return result;
}


// 초기 데이터 + 페이징
const fetchData = async (page) => {
    try {
        const response = await fetch(`http://localhost:8080/Board/${page}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ limit: 10 })
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message);
        }
        return result;

    } catch (error) {
        throw new Error(error.message || '연결 오류')
    }
};

export { fetchReply , fetchData }