import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment} from "@fortawesome/free-solid-svg-icons";
import ProfileBox from './ProfileBox';
import Modal from './Modal';
import '../styleSheets/post.css'
import axios from 'axios';
const LikeComment = ({postObj, userObj, onDetailClick}) => {

    const [likeCount, setLikeCount]=useState(postObj.likeCount)
    const [isLike, setIsLike] = useState(postObj.Likes.findIndex(i => i.User.id == userObj.id) != -1);
    const [likeModal, setLikeModal] = useState(false)

    const onHeartClick = () => {
        isLike?
        axios.delete(`/like/${userObj.id}/${postObj.id}`).then(()=>{
            setLikeCount(p=>p-1);
            setIsLike(false)})
        :
        axios.post("/like", {userId:userObj.id, postId:postObj.id}).then(()=>{
            setLikeCount(p=>p+1);
            setIsLike(true)})
    }
    const onlikeListClick = () => {
        setLikeModal(true);
    }

    return (<>
        {onDetailClick==undefined?<div className="heart-comment-wrapper">
            <FontAwesomeIcon id="icon" icon={faHeart} style={{ color: `${isLike ? "#ff7f50" : "#c5c5c5"}` }} onClick={onHeartClick} />
            <span className="bold-span" id="like-list" onClick={onlikeListClick}>좋아요</span>
            <span>{postObj.likeCount}명 </span>
            {likeModal && <>
                <div className="modal-bg"><span></span></div>
                <Modal isOpenModal={likeModal} setIsOpenModal={setLikeModal} children={<>
                    <div className="centerContainer like-list-modal">
                        <span className="label">좋아요</span>
                        <hr />
                        {postObj.Likes.map(it =>
                            <div className="post-profile-wrapper">
                                <ProfileBox profileObj={it.User} />
                            </div>)}
                    </div>
                </>} /></>}
            <FontAwesomeIcon id="icon" icon={faComment} />
            <span className="bold-span">댓글</span><span>{postObj.commentCount}명</span>
        </div>
        :<div className="heart-comment-wrapper">
            <FontAwesomeIcon id="icon" icon={faHeart} style={{ color: `${isLike ? "#ff7f50" : "#c5c5c5"}` }} onClick={onHeartClick} /> 
            <span>{likeCount}</span>
            <FontAwesomeIcon id="icon" icon={faComment} onClick={onDetailClick} />  
            <span>{postObj.commentCount}</span>
        </div>}
    </>)
}
export default LikeComment;
