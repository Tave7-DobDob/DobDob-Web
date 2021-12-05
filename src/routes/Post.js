import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditPostContainer from '../component/Post/EditPostContainer';
import Header from '../component/Header';
import LikeComment from '../component/LikeComment';
import CommentBox from '../component/Post/CommentBox';
import CommentForm from '../component/Post/CommentForm';
import Content from '../component/Post/Content';
import Head from '../component/Post/Head';
import { setPostInfo } from '../modules/postInfo';
import '../styleSheets/post.css';
const Post = () => {
    const dispatch = useDispatch();
    const { postObj, isOwner } = useSelector(state => ({
        postObj: state.postInfo.postObj,
        isOwner: state.postInfo.isOwner
    }));
    const userObj = useSelector(state => state.user.userObj);
    const [commentArr, setCommentArr] = useState([]);
    useEffect(() => {
        const update = setInterval(() => {
            axios.get(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/post/${postObj.id}`).then(res => {
                dispatch(setPostInfo(res.data.post, isOwner))
                setCommentArr(res.data.post.Comments)
            })
        }, 1000)
        return () => {
            setIsEdit(false);
            clearInterval(update);

        }
    }, []);
    const [isEdit, setIsEdit] = useState(false);

    return (<>
        <div className="Container post">
            <Header userObj={userObj} />
            {!isEdit ? <>
                <div className="main-content">
                    <div className="post-container">
                        <Head postObj={postObj} isOwner={isOwner} setIsEdit={setIsEdit} />
                        <hr />
                        <Content postObj={postObj} />
                    </div>
                    <div className="comment-container">
                        <LikeComment postObj={postObj} userObj={userObj} />
                        <CommentForm postObj={postObj} />
                        <CommentBox commentArr={commentArr} />
                    </div>
                </div></>
                :
                <EditPostContainer postObj={postObj} location={postObj.Location} setIsEdit={setIsEdit} />}
        </div>


    </>)
}
export default Post;
