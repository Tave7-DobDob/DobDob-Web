import REACT, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHeart, faComment, faSearch, faPen } from "@fortawesome/free-solid-svg-icons";
import Slider from '../component/Slider';
import moment from 'moment';
import Comment from '../component/Comment';
import TextareaAutosize from 'react-textarea-autosize';
import MentionHighlight from '../component/MentionHighlight';
import EditPostContainer from '../component/EditPostContainer';
const Post = () => {
    const [postObj, setPostObj] = useState(() => JSON.parse(window.localStorage.getItem("postObj")) || 0);
    const [isOwner, setIsOwner]=useState(true);
    const [isEdit, setIsEdit]=useState(false);
    const history = useHistory();
    const [commentArr, setCommentArr] = useState([{
        commentId: "",
        userId: "",
        postId: postObj,
        content: "@닉네임1 저랑 같이쳐요!",
        isDeleted: false,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        mentionId: ["닉네임1"],
    }, {
        commentId: "",
        userId: "",
        postId: postObj,
        content: "@닉네임1 @닉네임2 11시에 만나요!",
        isDeleted: false,
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        mentionId: ["닉네임2", "닉네임"],
    }]);
    const [comment, setComment] = useState("");//comment 입력 필드값
    const [isHeart, setIsHeart] = useState(false);
    const [mentionArr, setMentionArr] = useState([]);
    const [locationObj, setLocationObj]=useState({});
    const [user, setUser]=useState({})
    useEffect(() => {
        //db comment 받아오기
        //db heart 받아오기
        const post = JSON.parse(window.localStorage.getItem("postObj"));
        //post.postID로 comment 검색
        //post.locationId로 location 검색
        //post.userId로 user검색
        setLocationObj({
            si:"서울시",
            gu:"동작구",
            dong:"상도동",
        })
        setUser(post.userId);
    }, [])
    const onClickMyPage = () => {
        history.push("/mypage");
    }
    const onClickLogo = () => {
        history.push("/main");
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        if (value.search("@") != -1) {
            const mention = value.split(" ").filter(it => it.includes("@")).map(it => it.substring(1, it.length)).toString();
            setMentionArr(mentionArr => [...mentionArr, mention]);
        }
        setComment(value);
    }

    const onHeartClick = () => {
        setIsHeart(prev => !prev);
        //-> 하트 클릭 처리
    }
    
    const onEditClick = () => {
        setIsEdit(true);
        //-> 하트 클릭 처리
    }
    const onSubmit=(event)=>{
        event.preventDefault();
        try{
            const cmt={
                userId: "",
                postId: postObj,
                content: comment,
                isDeleted: false,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                mentionId: mentionArr,
            }
            //서버 전송
            setCommentArr(commentArr=>([...commentArr, cmt]))
            setComment("");
        }catch{}
    }
    return (<>
        <head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" /></head>
        <div className="Container post">
            <header><img src="logo2.png" width="60px" onClick={onClickLogo} />
                <div className="profile-wrapper">
                    <div onClick={onClickMyPage} data-toggle="tooltip" title="마이 페이지" className="profile-img"><img src="logo.png" /></div>
                    <span>닉네임</span>
                </div>
            </header>
            {!isEdit?<>
            <div className="main-content">
                <div className="post-container">
                    <div className="post-profile-wrapper">
                        <div className="profile-img"><img src="user.png" /></div>
                        <div className="sub-profile-wrapper">
                            <span>{user.nickName}</span>
                            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {locationObj.dong}</span>
                        </div>
                        {isOwner&&<button onClick={onEditClick} data-toggle="tooltip" title="수정" id="edit-btn"><FontAwesomeIcon icon={faPen}/></button>}
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
                        <Slider imgArr={["test.png", "setting.png"]} />
                    </div>
                    <div className="tag-wrapper">{postObj.tag.map(it => <span>#{it} </span>)}</div>
                    <hr />
                </div>
                <div className="comment-container">
                    <form onSubmit={onSubmit}>
                        <div className="heart-comment-wrapper"><FontAwesomeIcon id="icon" icon={faHeart} style={{ color: `${isHeart ? "#ff7f50" : "#c5c5c5"}` }} onClick={onHeartClick} /> {postObj.heart}  <FontAwesomeIcon id="icon" icon={faComment} />  {postObj.comment}</div>
                        
                        <TextareaAutosize id="comment-field" type="text" placeholder="댓글을 입력해주세요. " value={comment} onChange={onChange} />
                        <MentionHighlight content={comment} onChange={onChange} />

                        <input type="submit" value="&#xf054;" />
                    </form>
                    {commentArr.length == 0 ?
                        <div className="centerContainer nothing-wrapper">
                            <h5>아직 댓글이 없습니다 <FontAwesomeIcon icon={faSearch} /></h5>
                            <h4>이웃에게 댓글을 달아주세요!</h4>
                        </div> : commentArr.reverse().map(comment => <Comment commentObj={comment} isOwner={true}/>)}
                </div>
            </div></>:<EditPostContainer postObj={postObj} location={locationObj} user={user}/>}
        </div>


    </>)
}
export default Post;
