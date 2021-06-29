import REACT, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
import ProfileBox from './ProfileBox';
import { useDispatch } from 'react-redux';
import { setPostInfo } from '../modules/postInfo';
import axios from 'axios';
const PostContainer = ({ userObj, postObj }) => {
    const history = useHistory();
    const dispatch=useDispatch();
    const subContent = postObj.content.substr(0, 30);
    const [isHeart, setIsHeart] = useState(false);
    const [writer, setWriter] = useState({});
    useEffect(() => {
        //하트 검사-> setIsHeart();
       // console.log(postObj);
        setWriter(postObj.User);
    }, [])
    const onDetailClick = () => {
        axios.get(`/post/${postObj.id}`)
        .then(res=>
            dispatch(setPostInfo(res.data.post, userObj.id==writer.id)))
        
        history.push("/post");
    }
    const onHeartClick = () => {
        setIsHeart(prev => !prev);
        //-> 하트 클릭 처리
    }
    return (<div className="post-container">
        <div className="post-profile-wrapper">
            <ProfileBox profileObj={postObj.User} locationId={postObj.locationId} />
            <span id="date">{postObj.createdAt.split(/[T|.]/,2).map(it=>it+" ")}</span>
        </div>
        <hr />
        <div className="content-wrapper">
            <h2 onClick={onDetailClick}>{postObj.title}</h2>
            {<div className="sub-wrapper" onClick={onDetailClick}>
                <div>
                    {subContent.split("\n").filter((it, index) => index < 2).map((line) => <span><br />{line}</span>)}
                    <button id="more-btn"> ... 더 보기</button>
                </div>
            </div>}
        </div>
        <div className="heart-comment-wrapper">
            <FontAwesomeIcon id="icon" icon={faHeart} style={{ color: `${isHeart ? "#ff7f50" : "#c5c5c5"}` }} onClick={onHeartClick} /> 
            <span>{postObj.heart} </span> 
            <FontAwesomeIcon id="icon" icon={faComment} onClick={onDetailClick} />  
            <span>{postObj.comment}</span>
        </div>
        <hr />
        <div className="tag-wrapper">{postObj.tag&&postObj.tag.map(it => <span>#{it} </span>)}</div>
    </div>);
}
export default PostContainer;