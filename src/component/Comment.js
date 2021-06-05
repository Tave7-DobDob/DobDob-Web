import REACT, { useEffect, useState } from 'react';
import MentionHighlight from './MentionHighlight';
import ProfileBox from './ProfileBox';
const Comment = ({ commentObj, isOwner }) => {
    const [writer, setWriter] = useState({});
    useEffect(() => {
        setWriter(commentObj.userId);
    }, [])

    const onDelClick = () => {
        //isDeleted:true 로 변경
    }
    return (<div className="comment">
        <div className="post-profile-wrapper">
            <ProfileBox userObj={writer} locationId={writer.locationId} />
            <span id="date">{commentObj.createdAt}</span>
            {isOwner && <button id="del-btn" onClick={onDelClick}>삭제</button>}
        </div>
        <div>
            {/* <p>
                        {commentObj.mentionId.map(mention=><span id="mention">@{mention} </span>)}
                            {commentObj.content}</p> */}
            <MentionHighlight content={commentObj.content} />
        </div>
    </div>)
}
export default Comment;