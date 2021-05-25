import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHeart, faComment, faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import MyPostContainer from '../component/MyPostContainer';
const Mypage = () => {
    const [user, setUser] = useState({
        userId: "",
        locationId: "상도동",
        email: "",
        nickName: "닉네임",
        profileUrl: ""
    });
    const [postList, setPostList]=useState([{uNickName:"닉네임"
    ,uLocation:"상도4동",
    title:"같이 배드민턴 쳐요",
    content:"도화공원에서 같이 배드민턴 칠 사람 구해요 :-)",
    createdAt:moment().format('YYYY-MM-DD HH:mm:ss'),
    tag:["운동","배드민턴"],
    heart:12,
    comment:10
    },{uNickName:"닉네임"
    ,uLocation:"상도4동",
    title:"제목",
    content:"내용 어쩌구 저쩌구\nㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍddddddddddddddddddddddddddd",
    createdAt:  moment().format('YYYY-MM-DD HH:mm:ss'),
    tag:["태그1","태그2"],
    heart:12,
    comment:10
    }]);
    const history = useHistory();
    const onClickLogo = () => {
        history.push("/main");
    }
    useEffect(()=>{
        //postArr검색
    },[])
    return (<div className="Container myPage">
        <header><img src="logo2.png" width="60px" onClick={onClickLogo} /></header>
        <div className="centerContainer wrapper"> 
        <div className="centerContainer main-content">
                <div className="my-profile-wrapper">
                    <div className="profile-img"><img src="logo.png" /></div>
                    <div className="sub-profile-wrapper">
                        <span>{user.nickName}</span>
                        <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {user.locationId}</span>
                    </div>
                    <span>프로필 수정</span>
                </div>
                <span>{user.nickName}님이 작성한 글</span>
                <hr/>
                {postList.map(post=><MyPostContainer  postObj={post}/>)}
        </div>
        </div>
        

    </div>);
}

export default Mypage;