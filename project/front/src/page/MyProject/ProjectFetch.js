
const requestData = async (formData) =>{
    try{
        const response = await fetch('http://localhost:8080/project/add',
            {
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            }
        );
        if(!response.ok){
            throw new Error(response.message);
        }
        return response.json();
    }
    catch(error){
        throw error;
    }
}


export{
    requestData
}