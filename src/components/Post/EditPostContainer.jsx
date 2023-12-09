import PropTypes from "prop-types";
import React, { useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { useTagInput } from "../useInput";
import EditContent from "./EditContent";
import EditLocation from "./EditLocation";
import EditTag from "./EditTag";
const EditPostContainer = ({ postObj, location, setIsEdit }) => {
  useBeforeunload((event) => event.preventDefault());
  const [locationObj, setLocationObj] = useState(location);
  const [tag, setTag, tagArr, _, onClickDelTag] = useTagInput(
    "",
    postObj.Tags.map((it) => it.name)
  );

  return (
    <>
      <div className="centerContainer main-content">
        <div className="post-container edit-post-container">
          <EditLocation
            locationObj={locationObj}
            setLocationObj={setLocationObj}
          />
          <hr />
          <EditContent
            postObj={postObj}
            location={location}
            locationObj={locationObj}
            tagArr={tagArr}
            setIsEdit={setIsEdit}
          />
          <EditTag
            tag={tag}
            setTag={setTag}
            tagArr={tagArr}
            onClickDelTag={onClickDelTag}
          />
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
