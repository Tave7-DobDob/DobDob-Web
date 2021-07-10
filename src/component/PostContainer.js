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
    //const [isHeart, setIsHeart] = useState(postObj.Likes.findIndex(i => i.id == userObj.id)!=-1); //like clicked 여부
    const [isHeart, setIsHeart] = useState(false); //like clicked 여부
    
    const onDetailClick = () => {
        axios.get(`/post/${postObj.id}`)
        .then(res=>{
            dispatch(setPostInfo(res.data.post, userObj.id==postObj.User.id))
            history.push("/post");
            })
        
        
    }
    const onHeartClick = () => {
        isHeart?
        axios.delete(`/like/${userObj.id}/${postObj.id}`).then(setIsHeart(false))
        :
        axios.post("/like", {userId:userObj.id, postId:postObj.id}).then(setIsHeart(true))
    }
    return (<div className="post-container">
        <div className="post-profile-wrapper">
            <ProfileBox profileObj={postObj.User} location={postObj.Location} date={postObj.createdAt}/>
        </div>
        <hr />
        <div className="content-wrapper">
            <h2 onClick={onDetailClick}>{postObj.title}</h2>
            {<div className="sub-wrapper" onClick={onDetailClick}>
                <div>
                    {subContent.split("\n").filter((it, index) => index < 2).map((line) => <span><br />{line}</span>)}
                    {postObj.content.length>30||postObj.content.split('\n').length>3&&<button id="more-btn"> ... 더 보기</button>}
                </div>
            </div>}
        </div>
        <div className="heart-comment-wrapper">
            <FontAwesomeIcon id="icon" icon={faHeart} style={{ color: `${isHeart ? "#ff7f50" : "#c5c5c5"}` }} onClick={onHeartClick} /> 
            <span>{postObj.likeCount} </span> 
            <FontAwesomeIcon id="icon" icon={faComment} onClick={onDetailClick} />  
            <span>{postObj.commentCount}</span>
        </div>
        <hr />
        <div className="tag-wrapper">{postObj.Tags&&postObj.Tags.map(it => <span>#{it.name} </span>)}</div>
    </div>);
}
export default PostContainer;