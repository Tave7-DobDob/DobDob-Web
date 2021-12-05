import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { useSelector } from 'react-redux';
import Comment from '../component/Comment';
import '../styleSheets/post.css';
const CommentBox = ({commentArr}) => {
    const userObj = useSelector(state => state.user.userObj);
    return (
        <div className="comment-scroll-wrapper">
            {commentArr.length == 0 ?
                <div className="centerContainer nothing-wrapper">
                    <h5>아직 댓글이 없습니다 <FontAwesomeIcon icon={faSearch} /></h5>
                </div>
                :
                commentArr.map(comment => <Comment commentObj={comment} isOwner={comment.User.id == userObj.id} />)}
        </div>)
}
export default CommentBox;
