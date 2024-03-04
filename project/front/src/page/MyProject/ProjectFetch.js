
// 초기데이터 
const projectFetch = async() =>{
    try{
        const response = await fetch('http://localhost:8080/project');

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || `요청이 실패하였습니다. errorCode :  ${response.status}`);
        }
        const data = await response.json();
        return data
    }
    catch(error){
        throw new Error('서버에 문제가 있습니다.');
    }
}

// 생성
const addProjectFetch = async (formData , Type) =>{
    try{
        const response = await fetch(Type !== 'edit' ? 'http://localhost:8080/project/add' : `http://localhost:8080/project/editProject`,
            {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            }
        );
        if(!response.ok){
            const errorResult = await response.json();
            throw new Error(errorResult.message);
        }
        return await response.json();
    }
    catch(error){
        console.log(error);
        throw error;
    }
}


// 수정
const projectEdit = async(key) =>{
    console.log(key);
    try{
        const response = await fetch('http://localhost:8080/project/edit' , {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({key})
        });

        if(!response.ok){
            const errorResult = await response.json();
            console.log(errorResult);
            throw new Error( errorResult.message || '에러');
        }
        const result = await response.json();
        console.log(result);
        return result;
    }
    catch(error){
        throw error;
    }
}

//삭제
const projectDelete = async(key) =>{
    try{
        const response = await fetch(`http://localhost:8080/project/delete/${key}`,{
            method : 'delete'
        });
        if(!response.ok){
            const errorResult = await response.json();
            throw new Error(errorResult.message || '정상적으로 처리 되지 않았습니다.');
        }
        const result = await response.json();
        return result;

    }catch(error){
        throw error;
    }
}

export{
    addProjectFetch,
    projectFetch,
    projectEdit,
    projectDelete
};