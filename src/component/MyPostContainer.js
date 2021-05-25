import REACT from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
const MyPostContainer = ({ postObj }) => {
    const history = useHistory();
    const subContent = postObj.content.substr(0, 20);
    const onDetailClick = () => {
        window.localStorage.setItem("postObj", JSON.stringify(postObj));
        history.push("/post");
    }

    return (<div className="post-container my-post-container">
        <div className="post-profile-wrapper">
            <div className="profile-img"><img src="user.png" /></div>
            <div className="sub-profile-wrapper">
                <span>{postObj.uNickName}</span>
                <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {postObj.uLocation} <span id="date" style={{fontSize:"xx-small"}}>{postObj.createdAt}</span></span>
            </div>

        </div>
        <hr />
        <div className="content-wrapper">
            <h3  onClick={onDetailClick}>{postObj.title}</h3>

        </div>
        <div className="heart-comment-wrapper"><FontAwesomeIcon id="icon" icon={faHeart} /> {postObj.heart}  <FontAwesomeIcon id="icon" icon={faComment} />  {postObj.comment}</div>
        <hr />
        <div className="tag-wrapper">{postObj.tag.map(it => <span>#{it} </span>)}</div>
    </div>);
}
export default MyPostContainer;