import ReactQuill  from 'react-quill';
import 'quill/dist/quill.snow.css'; 
import SubTitle from '../../../../../component/ui/Subtitle';
import styled from 'styled-components';
import { Button } from '../../../../../component/ui/Button';
import { useState , useMemo, useRef, } from 'react';
import { useDispatch } from 'react-redux';
import alertThunk from '../../../../../store/alertTrunk';

const EditorStyle = styled.div`
    padding: 2rem 0;
`

const ReactQuillStyle = styled(ReactQuill)`
    .ql-editor{
        height: 500px;
    }
    .ql-align-center{
        text-align: center;
        img{
            display: block;
            margin: auto;
        }
    }
`

export default function QuillEditor({PROJECT_KEY}){
    const [editorContent, setEditorContent] = useState('');
    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    const quillRef = useRef();
    
    
    const dispatch = useDispatch();
    
    
    const uploadImage = async (img, projectKey) => { // projectKey 인자 추가
        console.log(projectKey);
        try {
            const response = await fetch(`http://localhost:8080/project/imgUploader/${projectKey}`, {
                method: 'POST',
                body: img
            });
            if (!response.ok) {
                throw new Error('이미지가 업로드 되지 않았습니다.');
            }
            const result = await response.json();
            return result;
        } catch (error) {
            dispatch(alertThunk(error.message, 0));
        }
    }

// quill에서 사용할 모듈
// useMemo를 사용하여 modules가 렌더링 시 에디터가 사라지는 버그를 방지

// ReactQuill의 custom handler 내에서 이미지 업로드 처리
function handleImageUpload() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');


//파일 확장자 닷(.)으로 시작되는 파일 확장자
//ex) .png, .jpg, .pdf, .hwp

//audio 모든 타입의 오디오 파일이 허용됨.

//video
//모든 타입의 비디오 파일이 허용됨.

//image

 	
//모든 타입의 이미지 파일이 허용됨.
//
//미디어 타입	 	
//매개변수(parameter)를 가지지 않는 유효한 미디어 타입
    input.click();
    

    input.addEventListener('change', async () => {
        const file = input.files[0];
        const formData = new FormData(); // FormData 인스턴스 생성
        formData.append('img', file); // 'img' 필드에 파일 추가
    
        try {
            const { fileUrl: imgUrl } = await uploadImage(formData, PROJECT_KEY);
            const editor = quillRef.current.getEditor();

            // 현재 커서의 위치를 가져옴
            const range = editor.getSelection();

            // 커서가 있는 위치에 이미지 삽입
            if (range) {
                editor.insertEmbed(range.index, 'image', `http://localhost:8080/${imgUrl}`);
                // 이미지 삽입 후 커서를 이동하는 로직은 경우에 따라 다를 수 있으므로, 
                // 정확한 커서 위치 조정이 필요하면 추가 로직을 구현해야 합니다.

                // 이미지 바로 뒤에 줄 바꿈을 삽입
                editor.insertText(range.index + 1, '\n');
                // 커서를 줄 바꿈 뒤로 이동
                editor.setSelection(range.index + 2, 0);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            dispatch(alertThunk(error.message, 0));
        }
    });
}



const modules = useMemo(() => { 
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }], // 헤더크기
          ["bold", "italic", "underline", "strike"], // 글자 스타일
          ["blockquote"], 
          [{ list: "ordered" }, { list: "bullet" }], //리스트 스타일
          [{ color: [] }, { background: [] }], // ccolor 색상
          [{ align: [] }, "link", "image"], // 정렬 ,하이퍼링크 , 이미지
        ],
        handlers : {
            'image' : handleImageUpload
        }
      },
    }
  }, [])

  
// fetchEditor1();
    const fetchEditor = async(formData , projectKey) => { 
        console.log(projectKey);
        try{
            const response = await fetch('http://localhost:8080/project/addproject',
            {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    key : projectKey  , 
                    ProjectDescription : formData
                })
            });
            if(!response.ok){
                throw new Error('서버에 문제가 있습니다.');
            }
            return await response.json();
        }

        catch(error){
            console.error('Error uploading image:', error);
            dispatch(alertThunk(error.message, 0));
        }
    }



    const onSubmitHandler = async(e) =>{
        e.preventDefault();
        console.log(e);
        const result = await fetchEditor(editorContent , PROJECT_KEY);
        console.log(result);
        // const editor = quillRef.current.getEditor();

        // const content = editor.getContents(); // 또는 editor.getText()
        // console.log(content);

        // const result = await fetchEditor(e);
        // console.log(result);
    }

    return(
        <EditorStyle>
            <form onSubmit={(e)=>onSubmitHandler(e)}>
                <SubTitle><span className='subText'>PROJECT - 내용</span></SubTitle>
                <ReactQuillStyle
                    modules={modules}
                    value={editorContent}
                    onChange={handleEditorChange}
                    ref={quillRef}
                />
                <Button.Submit>등록하기</Button.Submit>
            </form>
        </EditorStyle>
    )
}