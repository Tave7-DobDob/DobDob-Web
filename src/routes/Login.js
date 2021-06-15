import REACT from 'react';
const Login = () => {

    return (<><div className="Container login">
        <header><img src="logo3.png" width="80px" /></header>
        <div className="centerContainer login-view1">
            <div className="randing-wrapper">
                <div className="randing-text">
                    <h1>이웃과 나누는 <br /> 동네이야기</h1>
                    <p>이웃과 서로 돕고 돕는 커뮤니티 <h2>돕돕</h2> 내 근처에 귀를 기울여봐요 .<br />이웃에게 물어봐요 .</p>
                    <a href="https://kauth.kakao.com/oauth/authorize?client_id=14524cc95ffb83fa772e7ebe7d3d7059&redirect_uri=http://localhost:3000/oauth&response_type=code"
                    ><img src="kakao_login.png" id="kakao-login-btn" width="200px" /></a>
                </div>
                <div className="randing-img">
                    <img id="randing-img1" src="logo2.png" width="40%" />
                    <img id="randing-img2" src="monitor_poster.png" width="100%" />
                </div>
            </div>
        </div>
        <div className="centerContainer login-view2">
            <div className="randing-wrapper ">
                <div className="randing-text wrapper1">
                    <h1>우리동네 이웃들의 이야기를 볼 수 있어요 !</h1>
                    <p>동네 이웃들의 글을 볼 수 있어요.</p>
                    <span>내 주변과 가까운 동네 이웃들이 작성한 글들이 모아져 보여집니다.</span>
                    <br />
                    <span>동네 정보들도 얻어가고, 때로는 혼자가 아닌 이웃과 밥도 먹으면서 지내보세요 !</span>
                </div>
                <div className="randing-img"><img id="randing-img" src="Main.png" width="100%" />
                </div>
            </div>
            <div className="randing-wrapper">
                <div className="randing-img">
                    <img id="randing-img" src="main2.gif" width="80%" /></div>
                <div className="randing-text wrapper2">
                    <p>위치 설정으로 다른 동네의 글들도 볼 수 있어요.</p>
                    <span>다른동네의 이야기들도 궁금하다면 원하는 위치를 설정해서 찾아볼 수 있어요 !</span>
                </div>
            </div>
            <div className="randing-wrapper">
                <div className="randing-img">
                    <div className="centerContainer searchBar-wrapper">
                        <img src="search.gif" width="100%" /></div></div>
                <div className="randing-text wrapper2">
                    <p>검색으로 원하는 내용을 찾아 볼 수 있어요 .</p>
                    <span>태그 또는 내용으로 찾고자 하는 이야기들을 살펴볼 수 있어요 !</span>
                </div>
            </div>
            <div className="randing-wrapper randing-block2">
                <div className="randing-text">
                    <h1>이웃들에게 물어봐요 !</h1>
                    <p>동네의 궁금증이나 사소한 이야기에 대해 직접 이야기 할 수 있어요.</p>
                    <sppn>직접 원하는 동네에 글을 작성하거나, 댓글을 남길 수 있어요 !</sppn>
                </div>
                <div className="randing-img">
                    <img src="comment_posting.png" width="120%" />
                </div>
            </div>
        </div>
        <div className="centerContainer login-view3">
            <div className="row-container randing-wrapper">
                <div className="randing-text">
                    <p>카카오 로그인으로 간편하게</p>
                    <h1>지금 시작해보세요 !</h1>
                </div>
                <a href="https://kauth.kakao.com/oauth/authorize?client_id=14524cc95ffb83fa772e7ebe7d3d7059&redirect_uri=http://localhost:3000/oauth&response_type=code"
                ><img src="kakao_login.png" id="kakao-login-btn" width="200px" /></a>
            </div>
        </div>
    </div></>)
}

export default Login;