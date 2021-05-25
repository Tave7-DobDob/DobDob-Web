import REACT from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHeart, faComment} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
const PostContainer=({postObj})=>{
    const history=useHistory();
    const subContent=postObj.content.substr(0,20);
    const onDetailClick=()=>{
        
        window.localStorage.setItem("postObj", JSON.stringify(postObj));
        history.push("/post");
    }
    
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
            <button> ...
        <span id="more-span" onClick={onDetailClick}>자세히 보기</span></button>
            </div>
                    </div>
           </div>
        <div className="heart-comment-wrapper"><FontAwesomeIcon id="icon" icon={faHeart}/> {postObj.heart}  <FontAwesomeIcon id="icon" icon={faComment}/>  {postObj.comment}</div>
        <hr/>
        <div className="tag-wrapper">{postObj.tag.map(it=><span>#{it} </span>)}</div>
    </div>);
}
export default PostContainer;