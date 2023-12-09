import React from 'react';
import '../styleSheets/postContainer.css';
const PostContentBox = ({ postObj , onDetailClick}) => {
    return (
        <div className="content-wrapper">
            <h2 onClick={onDetailClick}>{postObj.title}</h2>
            {<div className="sub-wrapper" onClick={onDetailClick}>
                <div>
                    {postObj.content.substr(0, 30).split("\n").filter((it, index) => index < 2).map((line) => <span><br />{line}</span>)}
                    {(postObj.content.length > 30 || postObj.content.split('\n').length > 3) && <button id="more-btn"> ... 더 보기</button>}
                </div>
            </div>}
        </div>);
}
export default PostContentBox;