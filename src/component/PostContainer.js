import REACT from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHeart, faComment} from "@fortawesome/free-solid-svg-icons";
const PostContainer=({postObj})=>{
    const subContent=postObj.content.substr(0,20);
    
    return(<div className="post-container">
        <div className="post-profile-wrapper">
            <div className="profile-img"><img  src="user.png"/></div>
            <div className="sub-profile-wrapper">
                <span>{postObj.uNickName}</span>
                <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt}/> {postObj.uLocation}</span>
                </div>
            <span id="date">{postObj.createdAt}</span>
        </div>
        <hr/>
        <div className="content-wrapper">
            <h2>{postObj.title}</h2>
            <div className="sub-wrapper">
                <div>
            {subContent.split("\n").filter((it, index)=>index<2).map((line)=><span><br/>{line}</span>)}
            <button> ...</button>
            </div>
                    </div>
           </div>
        <span id="more-span">자세히 보기</span>
        <div className="heart-comment-wrapper"><FontAwesomeIcon id="icon" icon={faHeart}/> {postObj.heart}  <FontAwesomeIcon id="icon" icon={faComment}/>  {postObj.comment}</div>
        <hr/>
        <div className="tag-wrapper">{postObj.tag.map(it=><span>#{it} </span>)}</div>
    </div>);
}
export default PostContainer;