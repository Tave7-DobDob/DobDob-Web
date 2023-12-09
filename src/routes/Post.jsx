import { faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import Comment from "../components/Comment";
import EditPostContainer from "../components/EditPostContainer";
import Grid from "../components/Grid";
import Header from "../components/Header";
import LikeComment from "../components/LikeComment";
import MentionHighlight from "../components/MentionHighlight";
import Modal from "../components/Modal";
import ProfileBox from "../components/ProfileBox";
import { axiosInstance } from "../components/apis/instance";
import { setPostInfo } from "../modules/postInfo";
import "../styleSheets/post.css";
const Post = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { postObj, isOwner } = useSelector((state) => ({
    postObj: state.postInfo.postObj,
    isOwner: state.postInfo.isOwner,
  }));
  const userObj = useSelector((state) => state.user.userObj);
  const [commentArr, setCommentArr] = useState([]);
  useEffect(() => {
    const update = setInterval(() => {
      axiosInstance.get(`/post/${postObj.id}`).then((res) => {
        dispatch(setPostInfo(res.data.post, isOwner));
        setCommentArr(res.data.post.Comments);
      });
    }, 1000);
    return () => {
      setIsEdit(false);
      clearInterval(update);
    };
  }, []);
  const [comment, setComment] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };
  const onCommentSubmit = (event) => {
    event.preventDefault();
    try {
      const cmt = {
        content: comment,
        userId: userObj.id,
        postId: postObj.id,
      };
      //서버 전송
      axiosInstance.post(`/comment/`, {
        ...cmt,
      });
      setComment("");
    } catch (error) {
      window.alert(error.toString());
    }
  };

  const onDeleteClick = () => {
    if (window.confirm("글을 삭제하시겠습니까?") === true) {
      axiosInstance.delete(`/post/${postObj.id}`).then(history.goBack(1));
    }
  };
  const onModalClick = () => {
    setIsOpenModal((prev) => !prev);
  };
  const [isEdit, setIsEdit] = useState(false);
  const onEditClick = () => {
    setIsEdit(true);
  };

  const [isOpenMoal, setIsOpenModal] = useState(false);

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
        />
      </head>
      <div className="Container post">
        <Header userObj={userObj} />
        {!isEdit ? (
          <>
            <div className="main-content">
              <div className="post-container">
                <div className="post-profile-wrapper">
                  <ProfileBox
                    profileObj={postObj.User}
                    location={postObj.Location}
                  />
                  <div className="modal-container">
                    <Modal
                      isOpenModal={isOpenMoal}
                      setIsOpenModal={setIsOpenModal}
                      children={
                        <>
                          {isOwner && !isOpenMoal && (
                            <button onClick={onModalClick} id="menu-btn">
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                          )}
                          {isOpenMoal && (
                            <div className="edit-del-wrapper">
                              <button onClick={onEditClick}>수정</button>
                              <button onClick={onDeleteClick}>삭제</button>
                            </div>
                          )}
                        </>
                      }
                    />
                  </div>
                </div>
                <hr />
                <div className="content-wrapper">
                  <h2>{postObj.title}</h2>
                  <span id="date">
                    {postObj.createdAt.split(/[T|.]/, 2).map((it) => it + " ")}
                  </span>
                  <div className="sub-wrapper">
                    <div>
                      {postObj.content.split("\n").map((line) => (
                        <span>
                          <br />
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {postObj.PostImages.length > 0 && (
                  <Grid imgArr={postObj.PostImages} />
                )}
                <hr />
                <div className="tag-wrapper">
                  {postObj.Tags &&
                    postObj.Tags.map((it) => <span>#{it.name} </span>)}
                </div>
              </div>
              <div className="comment-container">
                <LikeComment postObj={postObj} userObj={userObj} />
                <form onSubmit={onCommentSubmit}>
                  <TextareaAutosize
                    id="comment-field"
                    type="text"
                    placeholder="댓글을 입력해주세요. "
                    value={comment}
                    onChange={onChange}
                  />
                  <MentionHighlight content={comment} onChange={onChange} />
                  <input type="submit" value="&#xf054;" />
                </form>

                <div className="comment-scroll-wrapper">
                  {commentArr.length === 0 ? (
                    <div className="centerContainer nothing-wrapper">
                      <h5>
                        아직 댓글이 없습니다 <FontAwesomeIcon icon={faSearch} />
                      </h5>
                    </div>
                  ) : (
                    commentArr.map((comment) => (
                      <Comment
                        commentObj={comment}
                        isOwner={comment.User.id === userObj.id}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <EditPostContainer
            postObj={postObj}
            location={postObj.Location}
            setIsEdit={setIsEdit}
          />
        )}
      </div>
    </>
  );
};
export default Post;
