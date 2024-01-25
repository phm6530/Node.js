import { useRef, useState } from 'react';
import useAuthRedirect from '../../component/common/AuthCustum';

const initalList = [ '퍼블리싱' , '기획' , '개발' ]

export default function ProjectAdd(){
    const [ skill , setSkill ] = useState([]);
    const [ value , setValue ] = useState('');
    const [ checkList , setCheckList ] = useState([]); 
    const ref = useRef();

    
    useAuthRedirect('/project'); //project 리턴
    
    const formSubmitHandler = (e) =>{
        e.preventDefault();
        console.log('submit');
    }

    const isValidate = () =>{
        const result = skill.some(cur => cur === value);
        console.log(result);
        // const result = skill.reduce((find , cur) =>{
        //     return find || cur === value;
        // },false)
        return result;
    }

    const skillSubmitHandler = () =>{
        
        if(!value) {
            alert('입력하세요.');
            return;
        }
        
        if(isValidate()){
            alert('이미 등록된 기술입니다.');
            return;
        }

        setSkill(prev => [...prev , value]);
        setValue('');
    }

    const deleteSkill = (e) =>{
        setSkill(prev =>  prev.filter((skill)=>{
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
            <form onSubmit={formSubmitHandler}>

                <div>
                    <span>프로젝트 명 : </span>
                    <input type="text" name='project_title'/>
                </div>

                <div>
                    <span>참여 : </span>
                    {initalList.map((e , idx)=>{
                        return (
                            <label key={idx}>
                                <input type='checkbox' 
                                onChange={checkboxHandler}
                                value={e} name={e}/>{e}
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
                    <button onClick={skillSubmitHandler}>추가 + </button>

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

                <button type='submit'>등록</button>
            </form>
        </>
    )
}