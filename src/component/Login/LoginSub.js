import '../styleSheets/login.css';
const LoginSub = () => {
    const kauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&redirect_uri=https://tave7-dobdob.github.io/DobDob-Web/&response_type=code`

    return (
        <div className="centerContainer login-view3">
            <div className="row-container randing-wrapper">
                <div className="randing-text">
                    <p>카카오 로그인으로 간편하게</p>
                    <h1>지금 시작해보세요 !</h1>
                </div>
                <a href={kauthUrl}>
                    <img src="kakao_login.png" id="kakao-login-btn" width="200px" /></a>
            </div>
        </div>
    )
}

export default LoginSub;