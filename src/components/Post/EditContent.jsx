import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { setPostInfo } from "../../modules/postInfo";
import Grid from "../Grid";
import { axiosInstance } from "../apis/instance";
const EditContent = ({
  postObj,
  originLocatoin,
  newLocation,
  tagArr,
  setIsEdit,
}) => {
  const dispatch = useDispatch();

  const [textObj, setTextObj] = useState({
    title: postObj.title,
    content: postObj.content,
  });
  const onSubmit = (event) => {
    event.preventDefault();
    try {
      JSON.stringify(originLocatoin) !== JSON.stringify(newLocation)
        ? axiosInstance
            .patch(`/post/${postObj.id}`, {
              ...textObj,
              tags: tagArr,
              locatoin: newLocation,
            })
            .then(() => {
              dispatch(
                setPostInfo(
                  {
                    ...postObj,
                    ...textObj,
                    Tags: tagArr,
                    Location: newLocation,
                  },
                  true
                )
              );
              setIsEdit(false);
            })
        : axiosInstance
            .patch(`/post/${postObj.id}`, {
              ...textObj,
              tags: tagArr,
            })
            .then(() => {
              dispatch(
                setPostInfo(
                  {
                    ...postObj,
                    ...textObj,
                    Tags: tagArr,
                    Location: newLocation,
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
      {postObj.PostImages.length > 0 && <Grid imgArr={postObj.PostImages} />}
    </>
  );
};

export default EditContent;
