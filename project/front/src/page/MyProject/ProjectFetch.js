

const projectFetch = async() =>{
    try{
        const response = await fetch('http://localhost:8080/project');
        if(!response.ok){
            throw new Error(response.message || `연결 오류 ${response.status}` )
        }
        const data = await response.json();
        return data
    }
    catch(error){
        throw error;
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