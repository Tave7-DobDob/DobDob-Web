import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PostContainer from '../component/PostContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPlus, faSlidersH, faCaretDown, faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import DaumPost from '../component/DaumPost';
import Modal from '../component/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileInfo } from '../modules/profileInfo';
import { setLoggedInfo } from '../modules/user';
import './main.css';
import axios from 'axios';
const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const userObj = useSelector(state => state.user.userObj);
    const [search, setSearch] = useState("");
    const [searchPost, setSearchPost] = useState();
    const [postList, setPostList] = useState(
        [/* {
            postId: 123,
            userId: { userId: 1, nickName: "김지현", locationId: { dong: "상도동" } }
            , locationId: { dong: "상도동" },
            title: "같이 배드민턴 쳐요",
            content: "공원에서 같이 배드민턴 칠 사람 구해요 :-)",
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            tag: ["운동", "배드민턴"],
            heart: 12,
            comment: 2
        }, {
            postId: 1234,
            userId: { userId: 2, nickName: "사용자", locationId: { dong: "노량진동" } }
            , locationId: { dong: "상도동" },
            title: "맛집좀 알려주세요!",
            content: "동네 맛집좀 알려주세요!\n이사온지 얼마 안돼서 주변 식당을 잘모릅니다 :-(",
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            tag: ["우리동네", "맛집", "추천"],
            heart: 2,
            comment: 10
        } */]);//test데이터
    const [isOpenDaum, setIsOpenDaum] = useState(false);
    const [locationObj, setLocationObj] = useState(userObj.locationId);
    const [isOpenMoal, setIsOpenModal] = useState(false);
    useEffect(() => {
        //locationId을 통해서 포스트 리스트 받기
        //setPostList();
        axios.get("/post").then(res => {
            setPostList([...res.data.posts])
        });
        
    },[]);

    const onChange = (event) => {
        const { target: { value } } = event;
        setSearch(value);
        if (value[0] == "#") {
            console.log(value);
            setSearchPost(postList.filter(post => post.tag.filter(it => it.includes(value.substr(1, value.length))).length != 0));
        }
        else {
            setSearchPost(postList.filter(post => post.title.includes(value)));
        }
    }

    const onClickMyPage = () => {
        dispatch(setProfileInfo(userObj, true));
        history.push("/profile");
    }
    const onClickPosting = () => {
        history.push("/posting");
    }
    const onClickLogo = () => {
        history.push("/");
    }
    const onClickLogout = () => {
        dispatch(setLoggedInfo(null, false));
        window.localStorage.clear();
        window.location.replace("/")
    }
    const onClickLocation = () => {
        //동네설정 modal
        setIsOpenDaum(prev => !prev);
    }
    const onModalClick = () => {
        setIsOpenModal(prev => !prev);
    }
    const onClickshap = () => {
        setSearch("#");
    }
    return (<div className="Container main">
        <header><img src="logo2.png" width="60px" onClick={onClickLogo} />
            <input type="text" onChange={onChange} placeholder="태그 및 내용을 검색해보세요 !" value={search} />
            <button id="tag-char" onClick={onClickshap}>#</button>
            <div className="profile-wrapper">
                <div onClick={onClickMyPage} className="profile-img" data-toggle="tooltip" title="마이 페이지"><img src={userObj.profileUrl ? userObj.profileUrl : "profile_img.png"} /></div>
                <span>{userObj.nickName}</span>
                <Modal setIsOpenModal={setIsOpenModal}>
                    <button onClick={onModalClick} id="menu-btn"><FontAwesomeIcon icon={faCaretDown} /></button>
                    {isOpenMoal && <div className="profile-modal">
                        <button onClick={onClickMyPage}><FontAwesomeIcon icon={faUserCircle} id="icon" /> 프로필 보기</button>
                        <button id="logout" onClick={onClickLogout}><FontAwesomeIcon icon={faSignOutAlt} id="icon" /> 로그아웃</button>
                    </div>}
                </Modal>
            </div>
        </header>
        <div className="centerContainer article-wrapper">
            {isOpenDaum && <DaumPost setLocationObj={setLocationObj} />}
            <div className="location-wrapper">
                <span className="label"><FontAwesomeIcon icon={faMapMarkerAlt} /> 나의 동네<FontAwesomeIcon id="icon" icon={faSlidersH} onClick={onClickLocation} data-toggle="tooltip" title="동네 재설정" /></span>
                <span>{locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
            </div>
            <div className="centerContainer post-wrapper">
                {postList.length == 0 || (search != "#" && search != "" && searchPost.length == 0) ? <>
                    <div className="centerContainer nothing-post-wrapper"><p>해당 동네의 게시물이 아직 없습니다.<br />먼저 글을 작성해보세요 !</p>
                        <img src="nothingPost.png" width="60%" />
                    </div>
                </> : <>{search == "" || search == "#" ? postList.map(post => <PostContainer postObj={post} userObj={userObj} />) :
                    searchPost.map(post => <PostContainer postObj={post} userObj={userObj} />)}</>}
            </div>
            <FontAwesomeIcon id="plus-icon" icon={faPlus} data-toggle="tooltip" title="글쓰기" onClick={onClickPosting} />
        </div>
    </div>)
}

export default Main;