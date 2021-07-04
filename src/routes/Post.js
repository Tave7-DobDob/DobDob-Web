import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faSearch, faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
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
    const [commentArr, setCommentArr] = useState([]);//test데이터
    const [comment, setComment] = useState("");//comment 입력 필드값
    const [isHeart, setIsHeart] = useState(false);
    const [mentionArr, setMentionArr] = useState([]);
    const [isOpenMoal, setIsOpenModal] = useState(false);

    useEffect(() => {
        //postId로 comment 검색
        const update = setInterval(() => {
            axios.get(`/post/${postObj.id}`).then(res => {
                console.log(postObj.id);
                dispatch(setPostInfo(res.data.post, isOwner))
            })
            axios.get(`/comment/${postObj.id}`).then(res => {
                setCommentArr(res.data.comments);
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
        if (value.search("@") != -1) {
            const mention = value.split(" ").filter(it => it.includes("@")).map(it => it.substring(1, it.length)).toString();
            setMentionArr(mentionArr => [...mentionArr, mention]);
        }
        setComment(value);
    }

    const onHeartClick = () => {
        setIsHeart(prev => !prev);
        //-> 하트 클릭 처리
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
            window.alert(error.messages)
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
                            <ProfileBox profileObj={postObj.User} locationId={postObj.location} />
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
                        {postObj.PostImages && <Grid imgArr={postObj.PostImages} /> }
                        <div className="tag-wrapper">{postObj.tag && postObj.tag.map(it => <span>#{it} </span>)}</div>
                        <hr />
                    </div>
                    <div className="comment-container">
                        <form onSubmit={onCommentSubmit}>
                            <div className="heart-comment-wrapper">
                                <FontAwesomeIcon name="heart" id="icon" icon={faHeart} style={{ color: `${isHeart ? "#ff7f50" : "#c5c5c5"}` }} onClick={onHeartClick} />
                                <span>{postObj.heart}</span>
                                <FontAwesomeIcon id="icon" icon={faComment} />
                                <span>{postObj.comment}</span></div>
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
                </div></> : <EditPostContainer postObj={postObj} location={postObj.location} setIsEdit={setIsEdit} />}
        </div>


    </>)
}
export default Post;
