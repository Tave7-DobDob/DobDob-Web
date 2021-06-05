import REACT, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
import ProfileBox from './ProfileBox';
const PostContainer = ({ postObj }) => {
    const history = useHistory();
    const subContent = postObj.content.substr(0, 20);
    const [isHeart, setIsHeart] = useState(false);
    const [writer, setWriter] = useState({});
    useEffect(() => {
        //하트 검사-> setIsHeart();
        //postObj.userId로 writer 검색
        setWriter(postObj.userId);
    }, [])
    const onDetailClick = () => {
        window.localStorage.setItem("postObj", JSON.stringify(postObj));
        history.push("/post");
    }
    const onHeartClick = () => {
        setIsHeart(prev => !prev);
        //-> 하트 클릭 처리
    }
    return (<div className="post-container">
        <div className="post-profile-wrapper">
            <ProfileBox userObj={writer} locationId={postObj.locationId} />
            <span id="date">{postObj.createdAt}</span>
        </div>
        <hr />
        <div className="content-wrapper">
            <h2 onClick={onDetailClick}>{postObj.title}</h2>
            <div className="sub-wrapper" onClick={onDetailClick}>
                <div>
                    {subContent.split("\n").filter((it, index) => index < 2).map((line) => <span><br />{line}</span>)}
                    <button> ... 더 보기</button>
                </div>
            </div>
        </div>
        <div className="heart-comment-wrapper"><FontAwesomeIcon id="icon" icon={faHeart} style={{ color: `${isHeart ? "#ff7f50" : "#c5c5c5"}` }} onClick={onHeartClick} /> {postObj.heart}  <FontAwesomeIcon id="icon" icon={faComment} onClick={onDetailClick} />  {postObj.comment}</div>
        <hr />
        <div className="tag-wrapper">{postObj.tag.map(it => <span>#{it} </span>)}</div>
    </div>);
}
export default PostContainer;