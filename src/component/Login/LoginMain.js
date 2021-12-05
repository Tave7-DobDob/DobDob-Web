import '../styleSheets/login.css';
const LoginMain = () => {
    const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=https://tave7-dobdob.github.io/DobDob-Web/&response_type=code`

    return (
        <div className="centerContainer login-view1">
            <div className="randing-wrapper">
                <div className="randing-text">
                    <h1>이웃과 나누는 <br /> 동네이야기</h1>
                    <p>이웃과 서로 돕고 돕는 커뮤니티 <h2>돕돕</h2> 내 근처에 귀를 기울여봐요 .<br />이웃에게 물어보세요 .</p>
                    <a href={kauthUrl}>
                        <img src="kakao_login.png" id="kakao-login-btn" width="200px" /></a>
                </div>
                <div className="randing-img">
                    <img id="randing-img1" src="logo2.png" width="40%" />
                    <img id="randing-img2" src="monitor_poster.png" width="100%" />
                </div>
            </div>
        </div>)
}

export default LoginMain;