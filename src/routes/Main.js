import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PostContainer from '../component/PostContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPlus, faSlidersH, faCaretDown, faUserCircle, faSignOutAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import DaumPost from '../component/DaumPost';
import Modal from '../component/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileInfo } from '../modules/profileInfo';
import { setLoggedInfo, setUserInfo } from '../modules/user';
import './main.css';
import axios from 'axios';
const Main = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const userObj = useSelector(state => state.user.userObj);
    const [search, setSearch] = useState("");
    const [postList, setPostList] = useState([]);
    const [isOpenDaum, setIsOpenDaum] = useState(false);
    const [locationObj, setLocationObj] = useState(userObj.Location);
    const [isOpenMoal, setIsOpenModal] = useState(false);
    useEffect(() => {
        //locationId을 통해서 포스트 리스트 받기
        axios.post("/post", {
            locationX: parseFloat(locationObj.locationX),
            locationY: parseFloat(locationObj.locationY)
        }).then(res => {
            setPostList(res.data.posts)
        });
    }, []);
    useEffect(() => {
        //location변경 후, 포스트 리스트 받기
        axios.post("/post", {
            locationX: parseFloat(locationObj.locationX),
            locationY: parseFloat(locationObj.locationY)
        }).then(res => {
            setPostList(res.data.posts)
        });
    }, [locationObj]);

    const onChange = (event) => {
        const { target: { value } } = event;
        setSearch(value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        search[0] == "#" ?
            axios.get(`/post/list/tag/${search.substring(1)}`).then(res => setPostList(res.data.posts))//태그 검색
            :
            axios.get(`/post/list/${search}`).then(res => setPostList(res.data.posts)) //제목 검색
    }

    const onClickMyPage = () => {
        dispatch(setProfileInfo(userObj, true));
        history.push("/profile");
    }
    const onClickPosting = () => {
        history.push("/posting");
    }
    const onClickLogo = () => {
        setSearch("");
        axios.post("/post", {
            locationX: parseFloat(locationObj.locationX),
            locationY: parseFloat(locationObj.locationY)
        }).then(res => {
            setPostList(res.data.posts)
        });
    }
    const onClickLogout = () => {
        dispatch(setLoggedInfo(null, false));
        window.localStorage.clear();
        window.location.replace("/")
    }
    const onClickLocation = () => {
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
            <form className="row-container" onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="제목 및 태그를 검색해보세요 !" value={search} />
                <input type="submit" value="검색" id="search-btn" style={{ display: "none" }} />
            </form>
            <button id="tag-char-btn" onClick={onClickshap}>#</button>
            <label id="search-btn-label" for="search-btn"><FontAwesomeIcon icon={faSearch} /></label>
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
                {postList.length == 0 ? <>
                    <div className="centerContainer nothing-post-wrapper"><p>해당 동네의 게시물이 아직 없습니다.<br />먼저 글을 작성해보세요 !</p>
                        <img src="nothingPost.png" width="60%" />
                    </div>
                </> : postList.map(post => <PostContainer postObj={post} userObj={userObj} />)}
            </div>
            <FontAwesomeIcon id="plus-icon" icon={faPlus} data-toggle="tooltip" title="글쓰기" onClick={onClickPosting} />
        </div>
    </div>)
}

export default Main;