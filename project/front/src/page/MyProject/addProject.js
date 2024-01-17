import { useState } from 'react';
import useAuthRedirect from '../../component/common/AuthCustum';

const initalList = [ '퍼블리싱' , '기획' , '개발' ]

export default function ProjectAdd(){
    const [ skill , setSkill ] = useState([]);
    const [ value , setValue ] = useState('');
    const [ checkList , setCheckList ] = useState([]); 
    
    const isEmpty = value.length === 0 && !value;

    console.log('checkList : ',checkList);

    useAuthRedirect('/project'); //project 리턴
    
    const submitHandler = (e) =>{
        e.preventDefault();
    }

    const listHnadler = () =>{
        
        if(!value) {
            alert('입력하세요.');
            return;
        }

        setSkill(prev => [...prev , value]);
        setValue('');

    }

    const deleteSkill = (e) =>{
        setSkill(prev => [...prev].filter((skill)=>{
            return skill !== e;
        }))
    }

    const checkboxHandler = (e) =>{
        const value = e.target.value;
        const isCheck = e.target.checked;

        if(isCheck){
            setCheckList(prev => [...prev , value]);
        }else{
            setCheckList(prev => prev.filter((item)=> item !== value ));
        }
    }

    return(
        <>  
            <h1>Project 등록</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <span>title</span>
                    <input type="text" name='title'/>
                </div>

                <div>
                    {initalList.map((e , idx)=>{
                        return (
                            <label key={idx}>
                                <input type='checkbox' 
                                onChange={checkboxHandler}
                                value={e} name='radio'/>{e}
                            </label>
                        )
                    })}
                </div>

                <div>
                    
                    {checkList.map((e, idx)=> 
                            <div key={idx}>
                                {e}
                            </div>
                    )}
                </div>

                <div>
                    <input type="file" />
                </div>

                <div>
                    <span>skill</span>
                    <input type="text" onChange={(e)=>setValue(e.target.value)} value={value}/>
                    { !isEmpty && <p>입력해주세요</p> }
                    <button onClick={listHnadler}>추가</button>

                    {skill.length === 0 && '등록 스킬이 없습니다.'}
                    {
                        skill.map((e , idx)=>{
                            return <div key={idx}>{e} <button onClick={()=>deleteSkill(e)}>x</button></div>
                        })
                    }
                </div>

                <div>
                    <textarea name="textarea" style={{'resize' : 'none'}} ></textarea>
                </div>
                
            </form>
        </>
    )
}