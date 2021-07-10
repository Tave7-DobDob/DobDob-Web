import REACT, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import DaumPost from './DaumPost';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPostInfo } from '../modules/postInfo';
import Grid from './Grid';
const EditPostContainer = ({ postObj, location, isOwner, setIsEdit }) => {
    const dispatch=useDispatch();  
    const [textObj, setTextObj] = useState({
        title: postObj.title,
        content: postObj.content
    })
    const [tagArr, setTagArr] = useState(postObj.tags.map(it=>it.name));//태그 arr
    const [tag, setTag] = useState("");//태그필드값
    const [isOpenDaum, setIsOpenDaum] = useState(false);
    const [locationObj, setLocationObj] = useState(location);//for 주소검색 component
    const onChange = (event) => {
        const { target: { value, name } } = event;
        //태그필드 onChange
        if (name == "tag") {
            setTag(value);
            if (value == " ") { setTag(value.replace(' ', '')); }
            else if ((value.indexOf(" ")) != -1) {
                setTag("");
                if(!tagArr.includes(value)){
                setTagArr(tagArr => ([...tagArr, value.replace(' ', '')]));
            }
            }
        }
        //제목 , 내용 필드 onChange
        else {
            setTextObj(textObj => ({ ...textObj, [name]: value }));
        }
    }
    //for 주소검색 component
    const onClickLocation = () => {
        setIsOpenDaum(true);
    }
    const onClickDelTag = (idx) => {
        //태그 삭제 기능
        let arr = tagArr;
        arr.splice(idx, 1)
        setTagArr([...arr])
    }
    const onSubmit = (event) => {
        event.preventDefault();
        try {
            //서버 전송
            axios.patch(`http://localhost:8001/post/${postObj.id}`,{...textObj,tag:tagArr}).then(()=>{
                dispatch(setPostInfo({...postObj,...textObj,tag:tagArr}, true));
                setIsEdit(false);
            })
        } catch(error) {
            window.alert(error.message)
        }
    }
    return (<>

        <div className="centerContainer main-content">
            {isOpenDaum && <DaumPost setLocationObj={setLocationObj} />}
            <div className="post-container edit-post-container">
                <div className="menu-wrapper">
                    <span className="location" data-toggle="tooltip" title="위치 재설정" onClick={onClickLocation}><FontAwesomeIcon icon={faMapMarkerAlt} id="marker" color="#ffc600" /> {locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
                </div>
                <hr />
                <div className="content-wrapper">
                    <form onSubmit={onSubmit}>
                        <input type="text" name="title" placeholder="제목을 입력하세요." value={textObj.title} onChange={onChange} />
                        <hr />
                        <TextareaAutosize name="content" placeholder="내용을 입력하세요." id="text-box" value={textObj.content} onChange={onChange} />
                        <input type="submit" id="submit-btn" value="완료" />
                    </form>
                </div>
                {postObj.PostImages.length>0 && <Grid imgArr={postObj.PostImages} /> }
                
                <div className="tag-wrapper posting-tag-wrapper">
                    <span>#</span>
                    <input type="text" name="tag" value={tag} onChange={onChange} placeholder="태그를 입력해보세요 !" />
                    {tagArr.map((tag, index) => <div class="centerContainer tag-box"><span>{tag}<span id="del-btn" onClick={() => onClickDelTag(index)}>X</span></span>
                    </div>)}
                </div>
                <hr />
            </div>
        </div>
    </>)
}
export default EditPostContainer;
