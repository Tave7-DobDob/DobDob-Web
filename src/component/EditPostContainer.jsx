import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";
import DaumPost from "./DaumPost";
import { useDispatch } from "react-redux";
import { setPostInfo } from "../modules/postInfo";
import Grid from "./Grid";
import { useInputObj, useTagInput } from "./useInput";
import { useBeforeunload } from "react-beforeunload";
import PropTypes from "prop-types";
import Modal from "./Modal";
import { axiosInstance } from "./apis/instance";
const EditPostContainer = ({ postObj, location, setIsEdit }) => {
  const dispatch = useDispatch();
  useBeforeunload((event) => event.preventDefault());

  const [isOpenDaum, setIsOpenDaum] = useState(false);
  const [locationObj, setLocationObj] = useState(location); //for 주소검색 component
  const onClickLocation = () => {
    setIsOpenDaum(true);
  };

  const [textObj, setTextObj] = useInputObj({
    title: postObj.title,
    content: postObj.content,
  });
  const [tag, setTag, tagArr, _, onClickDelTag] = useTagInput(
    "",
    postObj.Tags.map((it) => it.name)
  );
  const onSubmit = (event) => {
    event.preventDefault();
    try {
      JSON.stringify(location) !== JSON.stringify(locationObj)
        ? axiosInstance
            .patch(`/post/${postObj.id}`, {
              ...textObj,
              tags: JSON.stringify(tagArr),
              location: JSON.stringify(locationObj),
            })
            .then(() => {
              dispatch(
                setPostInfo(
                  {
                    ...postObj,
                    ...textObj,
                    Tags: tagArr,
                    Location: locationObj,
                  },
                  true
                )
              );
              setIsEdit(false);
            })
        : axiosInstance
            .patch(`/post/${postObj.id}`, {
              ...textObj,
              tags: JSON.stringify(tagArr),
            })
            .then(() => {
              dispatch(
                setPostInfo(
                  {
                    ...postObj,
                    ...textObj,
                    Tags: tagArr,
                    Location: locationObj,
                  },
                  true
                )
              );
              setIsEdit(false);
            });
    } catch (error) {
      window.alert(error.message);
    }
  };
  return (
    <>
      <div className="centerContainer main-content">
        {isOpenDaum && (
          <div className="address-modal-bg">
            <Modal
              isOpenModal={isOpenDaum}
              setIsOpenModal={setIsOpenDaum}
              children={
                <DaumPost
                  setLocationObj={setLocationObj}
                  setIsOpenModal={setIsOpenDaum}
                />
              }
            />
          </div>
        )}
        <div className="post-container edit-post-container">
          <div className="menu-wrapper">
            <span
              className="location"
              data-toggle="tooltip"
              title="위치 재설정"
              onClick={onClickLocation}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                id="marker"
                color="#ffc600"
              />{" "}
              {locationObj ? locationObj.dong : "동네를 설정해주세요."}
            </span>
          </div>
          <hr />
          <div className="content-wrapper">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="title"
                placeholder="제목을 입력하세요."
                value={textObj.title}
                onChange={setTextObj}
              />
              <hr />
              <TextareaAutosize
                name="content"
                placeholder="내용을 입력하세요."
                id="text-box"
                value={textObj.content}
                onChange={setTextObj}
              />
              <input type="submit" id="submit-btn" value="완료" />
            </form>
          </div>
          {postObj.PostImages.length > 0 && (
            <Grid imgArr={postObj.PostImages} />
          )}

          <div className="tag-wrapper posting-tag-wrapper">
            <span>#</span>
            <input
              type="text"
              name="tag"
              value={tag}
              onChange={setTag}
              placeholder="태그를 입력해보세요 !"
            />
            {!!tagArr &&
              tagArr.map((tag, index) => (
                <div class="centerContainer tag-box">
                  <span>
                    {tag}
                    <span id="del-btn" onClick={() => onClickDelTag(index)}>
                      X
                    </span>
                  </span>
                </div>
              ))}
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

EditPostContainer.propTypes = {
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    likeCount: PropTypes.number,
    commentCount: PropTypes.number,
    Location: PropTypes.object,
    User: PropTypes.object,
    PostImages: PropTypes.array,
  }),
  location: PropTypes.shape({
    dong: PropTypes.string,
  }),
  setIsEdit: PropTypes.node,
};
export default EditPostContainer;
