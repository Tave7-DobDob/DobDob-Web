import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { axiosInstance } from "../apis/instance";
import Modal from "../component/Modal";
import ProfileBox from "../component/ProfileBox";
import "../styleSheets/post.css";
const Head = ({ postObj, isOwner, setIsEdit }) => {
  const history = useHistory();
  const onDeleteClick = () => {
    if (window.confirm("글을 삭제하시겠습니까?") === true) {
      axiosInstance.delete(`/post/${postObj.id}`).then(history.goBack(1));
    }
  };
  const onModalClick = () => {
    setIsOpenModal((prev) => !prev);
  };
  const onEditClick = () => {
    setIsEdit(true);
  };

  const [isOpenMoal, setIsOpenModal] = useState(false);

  return (
    <div className="post-profile-wrapper">
      <ProfileBox profileObj={postObj.User} location={postObj.Location} />
      <div className="modal-container">
        <Modal isOpenModal={isOpenMoal} setIsOpenModal={setIsOpenModal}>
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
        </Modal>
      </div>
    </div>
  );
};
export default Head;
