import ReactQuill  from 'react-quill';
import 'quill/dist/quill.snow.css'; 
// import SubTitle from '../../../../../component/ui/Subtitle';
import styled from 'styled-components';
import { useMemo, useRef, forwardRef} from 'react';
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



const  QuillEditor = forwardRef(({ PROJECT_KEY, ...props}, _ ) => {

    console.log({...props});
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
const handleImageUpload = ()=>{
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
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
};

const modules = useMemo(() => { 


    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote"], 
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, "link", "image"],
        ],
        handlers : {
            'image' : handleImageUpload
        }
      },
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  
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



    // const onSubmitHandler = async(e) =>{
    //     e.preventDefault();
    //     console.log(e);
    //     const result = await fetchEditor(editorContent , PROJECT_KEY);
    //     console.log(result);
    //     // const editor = quillRef.current.getEditor();

    //     // const content = editor.getContents(); // 또는 editor.getText()
    //     // console.log(content);

    //     // const result = await fetchEditor(e);
    //     // console.log(result);
    // }

    return(
        <EditorStyle>
                {/* <SubTitle><span className='subText'>PROJECT - 내용</span></SubTitle> */}
                <ReactQuillStyle
                    modules={modules}
                    ref={quillRef}
                    {...props}
                />
        </EditorStyle>
    )
})


export default QuillEditor;