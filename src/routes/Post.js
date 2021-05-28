import REACT, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Modal from '../component/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHeart, faComment, faCaretDown, faSearch} from "@fortawesome/free-solid-svg-icons";
import Slider from '../component/Slider';
import moment from 'moment';
import Comment from '../component/Comment';
const Post = () => {
    const [postObj, setPostObj] = useState(()=>JSON.parse(window.localStorage.getItem("postObj")) || 0);
    const location = useLocation();
    const history=useHistory();
    const [isOpenMoal, setIsOpenModal]=useState(false);
    const [commentArr, setCommentArr]=useState([  {
        commentId:"",
        userId:"",
        postId:postObj,
        content:"저랑 같이쳐요!",
        isDeleted:false,
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
        mentionId:["닉네임1"],
    },{
        commentId:"",
        userId:"",
        postId:postObj,
        content:"11시에 만나요!",
        isDeleted:false,
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
        mentionId:["닉네임2", "닉네임"],
    } ]);
    const [comment, setComment]=useState("");
    const onClickMyPage=()=>{
        history.push("/mypage");
    }
    const onClickLogo=()=>{
        history.push("/main");
    }
    const onClickModal=()=>{
        setIsOpenModal(prev=>!prev);
    }
    const onChange=(event)=>{
        const {target:{value}}=event;
        setComment(value);
    }
    useEffect(()=>{
        //db comment 받아오기
        const post=JSON.parse(window.localStorage.getItem("postObj"));
        //post.postID로 comment 검색
    },[])
    return (<>
    <head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" /></head>
        <div className="Container post">
            <header><img src="logo2.png" width="60px" onClick={onClickLogo} />
                <div className="profile-wrapper">
                    <div onClick={onClickMyPage} className="profile-img"><img src="logo.png" /></div>
                    <span>닉네임</span>
                </div>
            </header>
            <div className="main-content">
                <div className="post-container">
                    <div className="post-profile-wrapper">
                        <div className="profile-img"><img src="user.png" /></div>
                        <div className="sub-profile-wrapper">
                            <span>{postObj.uNickName}</span>
                            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {postObj.uLocation}</span>
                        </div>
                    </div>
                    <hr />
                    <div className="content-wrapper">
                        <h2>{postObj.title}</h2>
                        
                        <span id="date">{postObj.createdAt}</span>
                        <div className="sub-wrapper">
                            <div>
                                {postObj.content.split("\n").map((line) => <span><br />{line}</span>)}
                                
                            </div>
                        </div>
                    </div>
                    <div className=" centerContainer slider-wrapper">
                        <Slider imgArr={["test.png","setting.png"]}/>
                    </div>
                    <div className="tag-wrapper">{postObj.tag.map(it => <span>#{it} </span>)}</div>
                    <hr />
                    
                         </div>
                <div className="comment-container">
                    <form>
                    <div className="heart-comment-wrapper"><FontAwesomeIcon id="icon" icon={faHeart} /> {postObj.heart}  <FontAwesomeIcon id="icon" icon={faComment} />  {postObj.comment}</div>
      
                        <input type="text" placeholder="댓글을 입력해주세요. " value={comment} onChange={onChange} />
                        <input type="submit" value="&#xf1d8;" />
                    </form>
                    {commentArr.length==0?
                    <div className="centerContainer nothing-wrapper">
                        <h5>아직 댓글이 없습니다 <FontAwesomeIcon icon={faSearch}/></h5>
                        <h4>이웃에게 댓글을 달아주세요!</h4>
                        </div>:commentArr.map(comment=><Comment commentObj={comment}/>)}                   
                </div>
            </div>
        </div>

    </>)
}
export default Post;
