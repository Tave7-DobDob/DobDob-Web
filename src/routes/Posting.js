import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import DaumPost from '../component/DaumPost';
import axios from 'axios';
import '../styleSheets/posting.css'
import { useSelector } from 'react-redux';
import { useFileInput, useInputObj, useTagInput } from '../component/useInput';
import { useBeforeunload } from 'react-beforeunload';
import Modal from '../component/Modal';
import Header from '../component/Header';
const Posting = () => {
    const history = useHistory();
    useBeforeunload((event) => event.preventDefault());

    const userObj=useSelector(state=>state.user.userObj);
    const [locationObj, setLocationObj] = useState(userObj.Location);

    const [fileArr, setFileArr, attachments, _] = useFileInput([],null);
    const [tag, setTag, tagArr, __, onClickDelTag] = useTagInput("",[]);
    const [textObj, setTextObj] = useInputObj({
        title: "",
        content: ""
    })
    const onSubmit = (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            for (let i = 0; i < fileArr.length; i++) {
                formData.append('postImage', fileArr[i])
            }
            console.log(JSON.stringify(locationObj));
            formData.append('userId', userObj.id)
            formData.append('location', JSON.stringify(locationObj))
            formData.append('title', textObj.title)
            formData.append('content', textObj.content)
            formData.append('tags', JSON.stringify(tagArr))
            
            axios.post("/post/upload", formData).then(res=>{ 
                if(res.status==201)history.push("/")
                else{
                    throw new Error("Posting 에러")
                }
            })  
        }
        catch(error){
            window.alert(error.message);
        }
    }
    
    const [isOpenDaum, setIsOpenDaum] = useState(false);
    const onClickLocation = () => {
        setIsOpenDaum(true);
    }
    return (<>
        <div className="Container posting">
            <Header/>
            <div className="centerContainer main-content">
            {isOpenDaum && <div className="address-modal-bg">
                <Modal isOpenModal={isOpenDaum} setIsOpenModal={setIsOpenDaum} children={<DaumPost setLocationObj={setLocationObj} setIsOpenModal={setIsOpenDaum}/>}/></div> }
                <div className="centerContainer posting-container">
                    <div className="menu-wrapper">
                        <span className="location" data-toggle="tooltip" title="위치 재설정" onClick={onClickLocation}><FontAwesomeIcon icon={faMapMarkerAlt} id="marker" color="#ffc600" /> {locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
                        <label for="photo-upload" data-toggle="tooltip" title="사진 첨부"><FontAwesomeIcon icon={faImages} /> <span>사진(최대 5장)</span></label>
                        <input multiple="multiple" type="file" onChange={setFileArr} id="photo-upload" style={{ display: "none" }} />
                    </div>
                    <div className="posting-wrapper">
                        <form onSubmit={onSubmit}>
                            <input type="text" name="title" placeholder="제목을 입력하세요." required value={textObj.title} onChange={setTextObj} />
                            <hr />
                            {attachments != null && <>
                                <span id="img-count">{attachments.length}/5</span>
                                <div className="attachment-wrapper">
                                    {attachments.map(img => <img src={img} width="100px" />)}
                                </div>
                                <hr /></>}
                            <TextareaAutosize name="content" placeholder="내용을 입력하세요." id="text-box" required value={textObj.content} onChange={setTextObj} />
                            <input type="submit" id="submit-btn" value="완료" />
                        </form>
                        <div className="tag-wrapper posting-tag-wrapper">
                            <span>#</span>
                            <input type="text" name="tag" value={tag} onChange={setTag} placeholder="태그를 입력해보세요 !" />
                            {!!tagArr&&tagArr.map((tag, index) => <div class="centerContainer tag-box"><span>{tag}<span id="del-btn" onClick={() => onClickDelTag(index)}>X</span></span>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)
}
export default Posting;
