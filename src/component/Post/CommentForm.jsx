import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import MentionHighlight from '../component/MentionHighlight';
import '../styleSheets/post.css';
const CommentForm = ({postObj}) => {
    const userObj = useSelector(state => state.user.userObj);
    const [comment, setComment] = useState("");
    const onChange = (event) => {
        const { target: { value } } = event;
        setComment(value);
    }
    const onCommentSubmit = (event) => {
        event.preventDefault();
        try {
            const cmt = {
                content: comment,
                userId: userObj.id,
                postId: postObj.id
            }
            //서버 전송
            axios.post(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/comment/`, { ...cmt })
            setComment("");
        } catch (error) {
            window.alert(error.toString())
        }
    }
    return (
        <form onSubmit={onCommentSubmit}>
            <TextareaAutosize id="comment-field" type="text" placeholder="댓글을 입력해주세요. " value={comment} onChange={onChange} />
            <MentionHighlight content={comment} onChange={onChange} />
            <input type="submit" value="&#xf054;" />
        </form>)
}
export default CommentForm;
