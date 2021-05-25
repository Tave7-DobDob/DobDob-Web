import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PostContainer from '../component/PostContainer';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faMapMarkerAlt, faPlus, faSlidersH} from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import Modal from '../component/Modal';
import DaumPost from '../component/DaumPost';
const Main=()=>{
    const history=useHistory();
    const [postList, setPostList]=useState(
        [ {uNickName:"닉네임"
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
    } ]);
    const [isOpenModal, setIsOpenModal]=useState(false);
    const [isOpenProfile, setIsOpenProfile]=useState(false);
    const [address, setAddress] = useState("");
    const [addressObj, setAddressObj] = useState(null);
    
    useEffect(()=>{
        //포스트 리스트 받기
        //setPostList();
    },[]);
    const onClickMyPage=()=>{
        history.push("/mypage");
    }
    const onClickPosting=()=>{
        history.push("/posting");
    }
    const onClickLogo=()=>{
        history.push("/main");
    }
    const onClickLocation=()=>{
        setIsOpenModal(prev=>!prev);
    }
    return(<div className="Container main">
        <header><img src="logo2.png" width="60px" onClick={onClickLogo}/>
            <input type="text" placeholder="태그 및 내용을 검색해보세요 !"/>
            
            <div className="profile-wrapper">
            <div onClick={onClickMyPage} className="profile-img"><img  src="logo.png"/></div>
            <span>닉네임</span>
            </div>
        </header>
        <div className="article-wrapper">
        {isOpenModal && <DaumPost setAddress={setAddress} setAddressObj={setAddressObj}/>}
        <div className="sub-menu">
            <div className="location-wrapper">
            <span className="label"><FontAwesomeIcon icon={faMapMarkerAlt}/> 나의 동네<FontAwesomeIcon id="icon" icon={faSlidersH} onClick={onClickLocation} data-toggle="tooltip" title="동네 재설정"/></span>
            <span>{addressObj ? addressObj.address.region_3depth_name : "동네를 설정해주세요."}</span>
            </div>
        </div>
        <div className="centerContainer post-wrapper">
            {postList.length==0? <>
                <div className="centerContainer nothing-post-wrapper"><p>해당 동네의 게시물이 아직 없습니다.<br/>먼저 글을 작성해보세요 !</p>
                    <img src="nothingPost.png" width="60%"/>
                </div>
            </> : postList.map(post=><PostContainer postObj={post}/>)}
            
        </div>
        <FontAwesomeIcon id="plus-icon" icon={faPlus} data-toggle="tooltip" title="글쓰기" onClick={onClickPosting}/>
        </div>
        
            </div>)
}

export default Main;