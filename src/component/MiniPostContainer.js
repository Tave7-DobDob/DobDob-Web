import REACT, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
import ProfileBox from './ProfileBox';
import { useDispatch } from 'react-redux';
import { setPostInfo } from '../modules/postInfo';
const MiniPostContainer = ({ postObj , isOwner}) => {
    const dispatch = useDispatch();
    const [writer, setWriter] = useState({});
    const history = useHistory();
    useEffect(() => {
        //userId로 검색 요청
        setWriter(postObj.userId);
    }, [])
    const onDetailClick = () => {
        dispatch( setPostInfo(postObj, isOwner))
        history.push("/post");
    }

    return (<div className="post-container my-post-container">
        <div className="post-profile-wrapper">
            <ProfileBox profileObj={writer} locationId={postObj.locationId} />
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