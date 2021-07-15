import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PostContainer from '../component/PostContainer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPlus, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import DaumPost from '../component/DaumPost';
import Modal from '../component/Modal';
import { useSelector } from 'react-redux';
import '../styleSheets/main.css';
import axios from 'axios';
import Header from '../component/Header';
const Main = () => {
    const history=useHistory();

    const userObj = useSelector(state => state.user.userObj);
    const [postList, setPostList] = useState([]);
    const [locationObj, setLocationObj] = useState(userObj.Location);
    useEffect(() => {
        axios.post("/post/list", {
            locationX: parseFloat(locationObj.locationX),
            locationY: parseFloat(locationObj.locationY)
        }).then(res => {
            setPostList(res.data.posts)

        });
    },[locationObj]); 
    

    const [search, setSearch] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        search[0] == "#" ?
            axios.post(`/post/list/tag`, {
                keyword:search.substring(1),
                locationX: parseFloat(locationObj.locationX),
                locationY: parseFloat(locationObj.locationY)
            }).then(res => setPostList(res.data.posts))//태그 검색
            :
            axios.post(`/post/list/title`,{
                keyword:search,
                locationX: parseFloat(locationObj.locationX),
                locationY: parseFloat(locationObj.locationY)
            }).then(res => setPostList(res.data.posts)) //제목 검색
    }
    
    const [isOpenDaum, setIsOpenDaum] = useState(false);

    const onClickLocation = () => {
        setIsOpenDaum(prev => !prev);
    }
    const onClickPosting=()=>{
        history.push("/posting")
    }
    return (<div className="Container main">
        <Header onSubmit={onSubmit} search={search} setSearch={setSearch} userObj={userObj}/>
        <div className="centerContainer article-wrapper">
            {isOpenDaum && <div className="address-modal-bg">
                <Modal isOpenModal={isOpenDaum} setIsOpenModal={setIsOpenDaum} children={<DaumPost setLocationObj={setLocationObj} setIsOpenModal={setIsOpenDaum}/>}/></div> }
            <div className="location-wrapper">
                <span className="label"><FontAwesomeIcon icon={faMapMarkerAlt} /> 나의 동네<FontAwesomeIcon id="icon" icon={faSlidersH} onClick={onClickLocation} data-toggle="tooltip" title="동네 재설정" /></span>
                <span>{locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
            </div>

            <div className="centerContainer post-wrapper">
                {!postList||postList.length == 0 ? <>
                    <div className="centerContainer nothing-post-wrapper"><p>해당 동네 게시물이 아직 없습니다.<br />먼저 글을 작성해보세요 !</p>
                        <img src="nothingPost.png" width="60%" />
                    </div>
                </> : postList.map(post => <PostContainer postObj={post} userObj={userObj} />)}
            </div>
            <FontAwesomeIcon id="plus-icon" icon={faPlus} data-toggle="tooltip" title="글쓰기" onClick={onClickPosting} />
        </div>
    </div>)
}

export default Main;