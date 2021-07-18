import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
import ProfileBox from './ProfileBox';
import { useDispatch } from 'react-redux';
import { setPostInfo } from '../modules/postInfo';
import axios from 'axios';
import PropTypes from 'prop-types';
import LikeComment from './LikeComment';
import '../styleSheets/postContainer.css';
const PostContainer = ({ userObj, postObj }) => {
    const history = useHistory();
    const dispatch=useDispatch();


    const onDetailClick = () => {
        axios.get(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/post/${postObj.id}`)
        .then(res=>{
            dispatch(setPostInfo(res.data.post, userObj.id==postObj.User.id))
            history.push("/post");
            })
        
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
                    {postObj.content.substr(0, 30).split("\n").filter((it, index) => index < 2).map((line) => <span><br />{line}</span>)}
                    {(postObj.content.length > 30||postObj.content.split('\n').length >3) && <button id="more-btn"> ... 더 보기</button>}
                    
                </div>
            </div>}
        </div>
        <LikeComment postObj={postObj} userObj={userObj} onDetailClick={onDetailClick}/>

        <hr />
        <div className="tag-wrapper">{postObj.Tags&&postObj.Tags.map(it => <span>#{it.name} </span>)}</div>
    </div>);
}

PostContainer.propTypes = {
    userObj: PropTypes.shape({
        id:PropTypes.number.isRequired

    }),
    postObj:PropTypes.shape({
        id:PropTypes.number,
        title:PropTypes.string,
        content:PropTypes.string,
        createdAt: PropTypes.string,
        likeCount:PropTypes.number,
        commentCount:PropTypes.number,
        Location:PropTypes.object,
        User:PropTypes.object
    })
}
export default PostContainer;