import REACT, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
import ProfileBox from './ProfileBox';
const MiniPostContainer = ({ postObj }) => {
    const [writer, setWriter] = useState({});
    const history = useHistory();
    useEffect(() => {
        setWriter(postObj.userId);
    }, [])
    const onDetailClick = () => {
        window.localStorage.setItem("postObj", JSON.stringify(postObj));
        history.push("/post");
    }

    return (<div className="post-container my-post-container">
        <div className="post-profile-wrapper">
            <ProfileBox userObj={writer} locationId={postObj.locationId} />
            <span id="date" style={{ fontSize: "xx-small" }}>{postObj.createdAt}</span>
        </div>
        <hr />
        <div className="content-wrapper">
            <h3 onClick={onDetailClick}>{postObj.title}</h3>
        </div>
        <div className="heart-comment-wrapper"><FontAwesomeIcon id="icon" icon={faHeart} /> {postObj.heart}  <FontAwesomeIcon id="icon" icon={faComment} onClick={onDetailClick}/>  {postObj.comment}</div>
        <hr />
        <div className="tag-wrapper">{postObj.tag.map(it => <span>#{it} </span>)}</div>
    </div>);
}
export default MiniPostContainer;