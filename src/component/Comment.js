import REACT, { useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import MentionHighlight from './MentionHighlight';
const Comment=({commentObj, isOwner})=>{
    /*
        commentObj={
            commentId
            userId
            postId
            content
            isDeleted
            createdAt
            mentionId
        }
    */
    const onDelClick=()=>{
        //isDeleted:true 로 변경
    }
    return(<div className="comment">
                    <div className="post-profile-wrapper">
                        <div className="profile-img"><img src="user.png" /></div>
                        <div className="sub-profile-wrapper">
                            <span>{commentObj.postId.uNickName}</span>
                            <div>
                            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {commentObj.postId.uLocation}</span>
                            <span id="date">{commentObj.createdAt}</span></div>
                        </div>
                        {isOwner&&<button id="del-btn" onClick={onDelClick}>삭제</button>}
                    </div>
                    <div>
                        {/* <p>
                        {commentObj.mentionId.map(mention=><span id="mention">@{mention} </span>)}
                            {commentObj.content}</p> */}
                            <MentionHighlight content={commentObj.content}/>
                    </div>
    </div>)
}
export default Comment;