import React from "react";
const EditTag = ({ tagArr, tag, setTag, onClickDelTag }) => {
  return (
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
  );
};

export default EditTag;
