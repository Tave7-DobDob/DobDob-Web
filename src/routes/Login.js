import REACT, { useEffect } from 'react';
import KakaoLogin from 'react-kakao-login';
import { useHistory } from 'react-router';
import AppRouter from '../component/Router';

const Login = () => {
    const history=useHistory();
    useEffect(() => {  //componentDidMount 역할을 해주는 형태의 useEffect (두번째 인자로 빈 배열)

        window.Kakao.Auth.createLoginButton({
            container: '#kakao-login-btn',
            success: function (authObj) {
                history.push("/setting")
                alert(JSON.stringify(authObj));
            },
            fail: function (err) {
                
                history.push("/setting")
                alert(JSON.stringify(err));
            }
            
        });
    }, []);


    return (<><div className="Container login">
        <header><img src="logo.png" width="80px"/></header>
        <div className="centerContainer login-view1">
            <div className="randing-wrapper">
                <div className="randing-text">
                <h1>이웃과 나누는 <br/> 동네이야기</h1>
                <p>이웃과 서로 돕고 돕는 커뮤니티 <h2>돕돕</h2> 내 근처에 귀를 기울여봐요 .<br/>이웃에게 물어봐요 .</p>
                <a id="kakao-login-btn"/>
                </div>
                <div className="randing-img">
                    <img id="logo2" src="logo2.png" width="50%"/>
                    <img src="randing.png" width="400px"/>
                </div>
            </div>
            
        </div>
        <div className="centerContainer login-view2">
            <div className="randing-text">
            <h1>우리동네 이웃의 이야기들을 볼 수 있어요 !</h1>
            <p>나의 주변 이웃의 글들을 볼 수 있어요.</p>
            <p>위치 설정으로 다른 동네의 글들도 볼 수 있답니다.</p>
            <p>검색으로 찾고 싶은 이야기를 볼 수도 있어요 .</p>
            </div>
            <div className="randing-text">
            <h1>이웃들에게 물어봐요 !</h1>
            <p>직접 동네의 궁금증이나 사소한 이야기를 할 수 있어요.</p>
            </div>
        </div>
    </div></>)
}

export default Login;