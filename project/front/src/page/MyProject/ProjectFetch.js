

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


const addProjectFetch = async (formData) =>{
    try{
        const response = await fetch('http://localhost:8080/project/add',
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
export{
    addProjectFetch,
    projectFetch
};