import REACT, { useEffect, useState } from 'react';
import MentionHighlight from './MentionHighlight';
import ProfileBox from './ProfileBox';
const Comment = ({ commentObj, isOwner }) => {
    const [writer, setWriter] = useState({});
    useEffect(() => {
        //userId로 검색요청
        setWriter(commentObj.userId);
    }, [])

    const onDelClick = () => {
        //isDeleted:true 로 변경요청
    }
    return (<div className="comment">
        <div className="post-profile-wrapper">
            <ProfileBox profileObj={writer} locationId={writer.locationId} />
            <span id="date">{commentObj.createdAt}</span>
            {isOwner && <button id="del-btn" onClick={onDelClick}>삭제</button>}
        </div>
        <div>
            <MentionHighlight content={commentObj.content} />
        </div>
    </div>)
}
export default Comment;