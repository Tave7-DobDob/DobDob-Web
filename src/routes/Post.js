import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faSearch, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Comment from '../component/Comment';
import TextareaAutosize from 'react-textarea-autosize';
import MentionHighlight from '../component/MentionHighlight';
import EditPostContainer from '../component/EditPostContainer';
import ProfileBox from '../component/ProfileBox';
import Modal from '../component/Modal';
import { useDispatch, useSelector } from 'react-redux';
import './post.css'
import axios from 'axios';
import { setPostInfo } from '../modules/postInfo';
import Grid from '../component/Grid'
const Post = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { postObj, isOwner } = useSelector(state => ({
        postObj: state.postInfo.postObj,
        isOwner: state.postInfo.isOwner
    }));
    const userObj = useSelector(state => state.user.userObj);
    const [isEdit, setIsEdit] = useState(false);
    const [commentArr, setCommentArr] = useState([]);
    const [comment, setComment] = useState("");
    const [isHeart, setIsHeart] = useState(postObj.Likes.findIndex(i => i.id == userObj.id)!=-1); //like clicked 여부
    const [isOpenMoal, setIsOpenModal] = useState(false);
    window.onbeforeunload = isEdit && function(e) {
        var dialogText = 'Dialog text here';
        e.returnValue = dialogText;
        return dialogText;
    };
    useEffect(() => {
        //postId로 post&comment
        const update = setInterval(() => {
            axios.get(`/post/${postObj.id}`).then(res => {
                dispatch(setPostInfo(res.data.post, isOwner))
                setCommentArr(res.data.post.Comments)
            })
        }, 1000)
        return () => {
            clearInterval(update);
        }
    }, [])

    const onClickLogo = () => {
        history.push("/");
    }

    const onChange = (event) => {
        const { target: { value } } = event;
        setComment(value);
    }

    const onHeartClick = () => {
        isHeart?
        axios.delete(`/like/${userObj.id}/${postObj.id}`).then(setIsHeart(false))
        :
        axios.post("/like", {userId:userObj.id, postId:postObj.id}).then(setIsHeart(true))
    }

    const onDeleteClick = () => {
        if(window.confirm("글을 삭제하시겠습니까?")==true){
        axios.delete(`/post/${postObj.id}`).then(history.push("/"))}
    }
    const onModalClick = () => {
        setIsOpenModal(prev => !prev);
    }
    const onEditClick = () => {
        setIsEdit(true);
    }
    const onCommentSubmit = (event) => {
        event.preventDefault();
        try {
            const cmt = {
                content: comment,
                userId: userObj.id,
                postId: postObj.id
            }
            //서버 전송
            axios.post(`/comment/`, { ...cmt })
            setComment("");
        } catch (error) {
            window.alert(error.toString())
        }
    }
    return (<>
        <head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" /></head>
        <div className="Container post">
            <header><img src="logo2.png" width="60px" onClick={onClickLogo} />
            </header>
            {!isEdit ? <>
                <div className="main-content">
                    <div className="post-container">
                        <div className="post-profile-wrapper">
                            <ProfileBox profileObj={postObj.User} location={postObj.Location} />
                            <div className="modal-container">
                                <Modal setIsOpenModal={setIsOpenModal}>
                                    {isOwner && !isOpenMoal && <button onClick={onModalClick} id="menu-btn"><FontAwesomeIcon icon={faEllipsisV} /></button>}
                                    {isOpenMoal && <div className="edit-del-wrapper">
                                        <button onClick={onEditClick}>수정</button>
                                        <button onClick={onDeleteClick}>삭제</button></div>}
                                </Modal>
                            </div>
                        </div>
                        <hr />
                        <div className="content-wrapper">
                            <h2>{postObj.title}</h2>
                            <span id="date">{postObj.createdAt.split(/[T|.]/, 2).map(it => it + " ")}</span>
                            <div className="sub-wrapper">
                                <div>
                                    {postObj.content.split("\n").map((line) => <span><br />{line}</span>)}
                                </div>
                            </div>
                        </div>
                        {postObj.PostImages.length>0 && <Grid imgArr={postObj.PostImages} /> }
                        <hr />
                        <div className="tag-wrapper">{postObj.Tags&&postObj.Tags.map(it => <span>#{it.name} </span>)}</div>
                    </div>
                    <div className="comment-container">
                        <form onSubmit={onCommentSubmit}>
                            <div className="heart-comment-wrapper">
                                <FontAwesomeIcon name="heart" id="icon" icon={faHeart} style={{ color: `${isHeart ? "#ff7f50" : "#c5c5c5"}` }} onClick={onHeartClick} />
                                <span>{postObj.likeCount}</span>
                                <FontAwesomeIcon id="icon" icon={faComment} />
                                <span>{postObj.commentCount}</span></div>
                            <TextareaAutosize id="comment-field" type="text" placeholder="댓글을 입력해주세요. " value={comment} onChange={onChange} />
                            <MentionHighlight content={comment} onChange={onChange} />
                            <input type="submit" value="&#xf054;" />
                        </form>
                        <div className="comment-scroll-wrapper">
                            {commentArr.length == 0 ?
                                <div className="centerContainer nothing-wrapper">
                                    <h5>아직 댓글이 없습니다 <FontAwesomeIcon icon={faSearch} /></h5>
                                </div> : commentArr.slice(0).reverse().map(comment => <Comment commentObj={comment} isOwner={comment.User.id == userObj.id} />)}
                        </div>
                    </div>
                </div></> : <EditPostContainer postObj={postObj} location={postObj.Location} setIsEdit={setIsEdit} />}
        </div>


    </>)
}
export default Post;
