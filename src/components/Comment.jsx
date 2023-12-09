import React from "react";
import MentionHighlight from "./MentionHighlight";
import ProfileBox from "./ProfileBox";
import { axiosInstance } from "./apis/instance";
const Comment = ({ commentObj, isOwner }) => {
  const onDelClick = () => {
    axiosInstance.delete(`/comment/${commentObj.id}`);
  };
  return (
    <div className="comment">
      <div className="post-profile-wrapper">
        <ProfileBox
          profileObj={commentObj.User}
          location={commentObj.User.Location}
          date={commentObj.createdAt}
        />
        {isOwner && (
          <button id="del-btn" onClick={onDelClick}>
            삭제
          </button>
        )}
      </div>
      <div>
        <MentionHighlight content={commentObj.content} />
      </div>
    </div>
  );
};
export default React.memo(Comment);
