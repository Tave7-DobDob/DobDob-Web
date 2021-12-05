import axios from 'axios';
import React, { useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';
import { useInputObj, useTagInput } from '../component/useInput';
import '../styleSheets/posting.css';
const PostingForm = ({ fileArr, attachments }) => {
    const history = useHistory();
    useBeforeunload((event) => event.preventDefault());

    const userObj = useSelector(state => state.user.userObj);
    const [locationObj, setLocationObj] = useState(userObj.Location);
    const [tag, setTag, tagArr, __, onClickDelTag] = useTagInput("", []);
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
            formData.append('userId', userObj.id)
            formData.append('location', JSON.stringify(locationObj))
            formData.append('title', textObj.title)
            formData.append('content', textObj.content)
            formData.append('tags', JSON.stringify(tagArr))

            axios.post("http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/post/upload", formData).then(res => {
                if (res.status == 201) history.push("/")
                else {
                    throw new Error("Posting 에러")
                }
            })
        }
        catch (error) {
            window.alert(error.message);
        }
    }

    return (<>
        <form onSubmit={onSubmit}>
            <input type="text" name="title" placeholder="제목을 입력하세요." required value={textObj.title} onChange={setTextObj} />
            <hr />
            {attachments != null &&
                <>
                    <span id="img-count">{attachments.length}/5</span>
                    <div className="attachment-wrapper">
                        {attachments.map(img => <img src={img} width="100px" />)}
                    </div>
                    <hr />
                </>}
            <TextareaAutosize name="content" placeholder="내용을 입력하세요." id="text-box" required value={textObj.content} onChange={setTextObj} />
            <input type="submit" id="submit-btn" value="완료" />
        </form>
        <div className="tag-wrapper posting-tag-wrapper">
            <span>#</span>
            <input type="text" name="tag" value={tag} onChange={setTag} placeholder="태그를 입력해보세요 !" />
            {!!tagArr && tagArr.map((tag, index) =>
                <div class="centerContainer tag-box">
                    <span>{tag}<span id="del-btn" onClick={() => onClickDelTag(index)}>X</span></span>
                </div>)}
        </div>
    </>)
}
export default PostingForm;
