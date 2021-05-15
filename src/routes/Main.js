import REACT from 'react';
import { useHistory } from 'react-router';

const Main=()=>{
    const history=useHistory();
    const onClickMyPage=()=>{
        history.push("/mypage");
    }
    const onClickPosting=()=>{
        history.push("/posting");
    }
    return(<div>메인 페이지
        <button onClick={onClickMyPage}>마이 페이지 이동</button>
        <button onClick={onClickPosting}>글쓰기 페이지 이동</button>
    </div>)
}

export default Main;