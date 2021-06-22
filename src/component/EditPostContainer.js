import REACT, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Slider from './Slider';
import TextareaAutosize from 'react-textarea-autosize';
import DaumPost from './DaumPost';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPostInfo } from '../modules/postInfo';
const EditPostContainer = ({ postObj, location, isOwner, setIsEdit }) => {
    const dispatch=useDispatch();
    const [newPostObj, setNewPostObj] = useState(postObj);
    const [tagArr, setTagArr] = useState(postObj.tag);//태그 arr
    const [tag, setTag] = useState("");//태그필드값
    const [isOpenModal, setIsOpenModal] = useState(false);//for 주소검색 component
    const [locationObj, setLocationObj] = useState(location);//for 주소검색 component
    const onChange = (event) => {
        const { target: { value, name } } = event;
        //태그필드 onChange
        if (name == "tag") {
            //태그 검색 기능 추가
            setTag(value);
            if (value == " ") { setTag(value.replace(' ', '')); }
            else if ((value.indexOf(" ")) != -1) {
                setTag("");
                setTagArr(tagArr => ([...tagArr, value]));
            }
        }
        //제목 , 내용 필드 onChange
        else {
            setNewPostObj(newPostObj => ({ ...newPostObj, [name]: value }));
        }
    }
    //for 주소검색 component
    const onClickLocation = () => {
        setIsOpenModal(true);
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
            axios.patch(`http://localhost:8001/post/${postObj.postId}`,{...newPostObj,tag:tagArr})
            
            dispatch(setPostInfo({...newPostObj,tag:tagArr}, isOwner))
            setIsEdit(false);
        } catch { }
    }
    return (<>

        <div className="centerContainer main-content">
            {isOpenModal && <DaumPost setLocationObj={setLocationObj} />}
            <div className="post-container edit-post-container">
                <div className="menu-wrapper">
                    <span className="location" data-toggle="tooltip" title="위치 재설정" onClick={onClickLocation}><FontAwesomeIcon icon={faMapMarkerAlt} id="marker" color="#ffc600" /> {locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
                </div>
                <hr />
                <div className="content-wrapper">
                    <form onSubmit={onSubmit}>
                        <input type="text" name="title" placeholder="제목을 입력하세요." value={newPostObj.title} onChange={onChange} />
                        <hr />
                        <TextareaAutosize name="content" placeholder="내용을 입력하세요." id="text-box" value={newPostObj.content} onChange={onChange} />
                        <input type="submit" id="submit-btn" value="완료" />
                    </form>
                </div>
                <div className=" centerContainer slider-wrapper">
                    <Slider imgArr={["test.png", "setting.png"]} />
                </div>
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
