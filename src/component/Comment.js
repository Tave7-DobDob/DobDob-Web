import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MentionHighlight from './MentionHighlight';
import ProfileBox from './ProfileBox';
const Comment = ({ commentObj, isOwner }) => {

    const onDelClick = () => {
        axios.delete(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/comment/${commentObj.id}`)
    }
    return (<div className="comment">
        <div className="post-profile-wrapper">
            <ProfileBox profileObj={commentObj.User} location={commentObj.User.Location} date={commentObj.createdAt}/>
            {isOwner && <button id="del-btn" onClick={onDelClick}>삭제</button>}
        </div>
        <div>
            <MentionHighlight content={commentObj.content} />
        </div>
    </div>)
}
export default React.memo(Comment);