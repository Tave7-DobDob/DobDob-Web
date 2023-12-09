import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Header from '../component/Header';
import Location from '../component/Main/Location';
import PostContainer from '../component/PostContainer';
import '../styleSheets/main.css';
const Main = () => {
    const history=useHistory();
    const userObj = useSelector(state => state.user.userObj);
    const [postList, setPostList] = useState([]);
    const [locationObj, setLocationObj] = useState(userObj.Location);
    useEffect(() => {
        axios.post("http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/post/list", 
        {locationX: parseFloat(locationObj.locationX),
            locationY: parseFloat(locationObj.locationY)
        }).then(res => {
            setPostList(res.data.posts)

        });
    },[locationObj]); 
    

    const [search, setSearch] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        search[0] == "#" ?
            axios.post(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/post/list/tag`, {
                keyword:search.substring(1),
                locationX: parseFloat(locationObj.locationX),
                locationY: parseFloat(locationObj.locationY)}).then(res => setPostList(res.data.posts))//태그 검색
            :
            axios.post(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/post/list/title`,{
                keyword:search,
                locationX: parseFloat(locationObj.locationX),
                locationY: parseFloat(locationObj.locationY)}).then(res => setPostList(res.data.posts)) //제목 검색
    }
    const onClickPosting=()=>{
        history.push("/posting")
    }
    return (<div className="Container main">
        <Header onSubmit={onSubmit} search={search} setSearch={setSearch} userObj={userObj} locationObj={locationObj} setPostList={setPostList}/>
        <div className="centerContainer article-wrapper">
            <Location locationObj={locationObj} setLocationObj={setLocationObj}/>
            <div className="centerContainer post-wrapper">
                {!postList||postList.length == 0 ? <>
                    <div className="centerContainer nothing-post-wrapper"><p>해당 동네 게시물이 아직 없습니다.<br />먼저 글을 작성해보세요 !</p>
                        <img src="nothingPost.png" width="60%" />
                    </div>
                </> : postList.map(post => <PostContainer postObj={post} userObj={userObj}/>)}
            </div>
            <FontAwesomeIcon id="plus-icon" icon={faPlus} data-toggle="tooltip" title="글쓰기" onClick={onClickPosting} />
        </div>
    </div>)
}

export default Main;