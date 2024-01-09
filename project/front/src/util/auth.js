import { redirect } from 'react-router-dom';


export async function tokenCheck({params}){   
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:8080/test/${params.num}` ,
        {
            method : 'POST',
            headers : {
                'Authorization': `Bearer ${token}`
            }
        }
    );
    const data = await response.json(); // 데이터를 JSON 형태로 파싱
    if(!response.ok){
        alert('권한이 없습니다.');
        return redirect('/');
    }
    // data를 사용하거나 반환
    return data;
}