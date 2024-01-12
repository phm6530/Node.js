import { json } from 'react-router-dom';


export async function tokenCheck(){   
    
    try{
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await fetch(`http://localhost:8080/auth` ,
            {
                method : 'POST',
                headers : {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        const data = await response.json(); // 데이터를 JSON 형태로 파싱
        if(!response.ok){
            return json({Auth : false})
        }
        // data를 사용하거나 반환
        console.log(data);
        return data;
    }

    catch(error){
        console.error('error');
        return json({Auth : false})
    }
 
}