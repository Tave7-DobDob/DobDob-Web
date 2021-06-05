import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PostContainer from '../component/PostContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPlus, faSlidersH, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import DaumPost from '../component/DaumPost';
import Modal from '../component/Modal';
const Main = ({ userObj }) => {
    const history = useHistory();
    const [search, setSearch]=useState("");
    const [searchPost, setSearchPost]=useState();
    const [postList, setPostList] = useState(
        [{
            userId: { userId: 1, nickName: "닉네임", locationId: { dong: "상도동" } }
            , locationId: { dong: "상도동" },
            title: "같이 배드민턴 쳐요",
            content: "도화공원에서 같이 배드민턴 칠 사람 구해요 :-)",
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            tag: ["운동", "배드민턴"],
            heart: 12,
            comment: 10
        }, {
            userId: { nickName: "닉네임", }
            , locationId: { dong: "상도동" },
            title: "제목",
            content: "내용 어쩌구 저쩌구\nㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍddddddddddddddddddddddddddd",
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            tag: ["태그1", "태그2"],
            heart: 12,
            comment: 10
        }]);
    const [isOpenDaum, setIsOpenDaum] = useState(false);
    const [address, setAddress] = useState("");
    const [locationObj, setLocationObj] = useState(userObj.locationId);
    const [isOpenMoal, setIsOpenModal] = useState(false);
    useEffect(() => {

        //addressObj을 통해서 포스트 리스트 받기
        //setPostList();
        
    }, []);
    
    const onChange=(event)=>{
        const {target:{value}}=event;
        setSearch(value);
        if(value[0]=="#"){
            console.log(value);
            setSearchPost(postList.filter(post=>post.tag.filter(it=>it.includes(value.substr(1,value.length))).length!=0));
        }
        else{
            setSearchPost(postList.filter(post=>post.title.includes(value)));
        }
    }
    
    const onClickMyPage = () => {
        window.localStorage.setItem("profileObj", JSON.stringify(userObj));
        history.push("/profile");
    }
    const onClickPosting = () => {
        history.push("/posting");
    }
    const onClickLogo = () => {
        history.push("/main");
    }
    const onClickLogout=()=>{
        window.localStorage.removeItem("userObj");
        window.localStorage.removeItem("profileObj");
        window.localStorage.removeItem("postObj");
        window.location.replace("/")
    }
    const onClickLocation = () => {
        //동네설정 modal
        setIsOpenDaum(prev => !prev);
    }
    const onModalClick = () => {
        setIsOpenModal(prev => !prev);
    }
    const onClickshap=()=>{
        setSearch("#");
    }
    return (<div className="Container main">
        <header><img src="logo2.png" width="60px" onClick={onClickLogo} />
            <input type="text" onChange={onChange} placeholder="태그 및 내용을 검색해보세요 !" value={search}/>
            <button id="tag-char"onClick={onClickshap}>#</button>
            <div className="profile-wrapper">
                <div onClick={onClickMyPage} className="profile-img" data-toggle="tooltip" title="마이 페이지"><img src="logo.png" /></div>
                <span>닉네임</span>
                <Modal setIsOpenModal={setIsOpenModal}>
                    <button onClick={onModalClick} id="menu-btn"><FontAwesomeIcon icon={faCaretDown} /></button>
                    {isOpenMoal && <div className="profile-modal">
                        <button onClick={onClickMyPage}>프로필 보기</button>
                        <button id="logout" onClick={onClickLogout}>로그아웃</button>
                    </div>}
                </Modal>

            </div>
        </header>
        <div className="centerContainer article-wrapper">
            {isOpenDaum && <DaumPost setAddress={setAddress} setLocationObj={setLocationObj} />}
            <div className="location-wrapper">
                <span className="label"><FontAwesomeIcon icon={faMapMarkerAlt} /> 나의 동네<FontAwesomeIcon id="icon" icon={faSlidersH} onClick={onClickLocation} data-toggle="tooltip" title="동네 재설정" /></span>
                <span>{locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
            </div>
            <div className="centerContainer post-wrapper">
                {postList.length == 0||(search!="#"&&search!=""&&searchPost.length==0) ? <>
                    <div className="centerContainer nothing-post-wrapper"><p>해당 동네의 게시물이 아직 없습니다.<br />먼저 글을 작성해보세요 !</p>
                        <img src="nothingPost.png" width="60%" />
                    </div>
                </> : <>{search==""||search=="#"?postList.map(post => <PostContainer postObj={post} isOwner={false} />):
                searchPost.map(post => <PostContainer postObj={post} isOwner={false} />)}</>}
            </div>
            <FontAwesomeIcon id="plus-icon" icon={faPlus} data-toggle="tooltip" title="글쓰기" onClick={onClickPosting} />
        </div>
    </div>)
}

export default Main;