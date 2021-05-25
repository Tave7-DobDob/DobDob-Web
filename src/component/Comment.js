import REACT from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
const Comment=({commentObj})=>{
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
    return(<div className="comment">
                    <div className="post-profile-wrapper">
                        <div className="profile-img"><img src="user.png" /></div>
                        <div className="sub-profile-wrapper">
                            <span>{commentObj.postId.uNickName}</span>
                            <div>
                            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {commentObj.postId.uLocation}</span>
                            <span id="date">{commentObj.createdAt}</span></div>
                        </div>
                    </div>
                    <div>
                        <p>
                        {commentObj.mentionId.map(mention=><span id="mention">@{mention} </span>)}
                            {commentObj.content}</p>
                    </div>
    </div>)
}
export default Comment;