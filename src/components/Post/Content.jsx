import React from "react";
import Grid from "../component/Grid";
import "../styleSheets/post.css";
const Content = ({ postObj }) => {
  return (
    <>
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
      {postObj.PostImages.length > 0 && <Grid imgArr={postObj.PostImages} />}
      <hr />
      <div className="tag-wrapper">
        {postObj.Tags && postObj.Tags.map((it) => <span>#{it.name} </span>)}
      </div>
    </>
  );
};
export default Content;
