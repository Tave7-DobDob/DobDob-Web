import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const Main=()=>{
    const history=useHistory();
    const [postList, setPostList]=useState([]);
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
    return(<div className="Container main">
        <header>메인 페이지<div>
            //검색창
            <button onClick={onClickMyPage}>프로필 사진</button>
        </div>
        </header>
        <div className="centerContainer post-wrapper">

        </div>
        <button onClick={onClickPosting}>글쓰기 페이지 이동</button>
    </div>)
}

export default Main;