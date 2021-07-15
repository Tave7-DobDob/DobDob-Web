import AppRouter from './Router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInfo, setSetting } from '../modules/user';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './Footer'
function App() {
  const dispatch = useDispatch();
  const { userObj, isLoggedin, isSetting } = useSelector(state => ({
    userObj: state.user.userObj,
    isLoggedin: state.user.isLoggedin,
    isSetting: state.user.isSetting
  }))
  const [token] = useState(JSON.parse(window.localStorage.getItem('token')));
  const query = queryString.parse(window.location.search);

  useEffect(() => {
    if (window.location.pathname == "/oauth") {
      getKakaoTokenHandler(query);
    }
    else {

      if(userObj == null || !token || (new Date().getTime() - token.received_at) < 0) {
        dispatch(setLoggedInfo(null, false));
        window.localStorage.removeItem("token");
      }
      else {
        if (userObj.nickName != "") {
          dispatch(setSetting(true));
        }
        else {
          dispatch(setSetting(false));
        }
      }
    }

  }, []);

  //카카오 rest api 토큰 발급
  const getKakaoTokenHandler = async (query) => {
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_KEY,
      redirect_uri: "http://localhost:3000/oauth",
      code: query.code
    };
    const queryString = Object.keys(data)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

    axios.post('https://kauth.kakao.com/oauth/token', queryString, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
      window.localStorage.setItem("token", JSON.stringify({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        refresh_token_expires_in: 5183999,
        received_at: new Date().now
      }));
      sendTokenToServer({
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token
      });
      window.history.replaceState({}, null, window.location.origin + window.location.hash);
    });
  }
  const sendTokenToServer = (token) => {
    axios.post('/auth/kakao', { ...token })
      .then(res => {
        if (res.status == 200) {
          window.localStorage.setItem("token", JSON.stringify({
            ...res.data.kakaoToken,
            refresh_token_expires_in: 5183999,
            received_at: new Date().getTime()
          }));
        }
        if (res.status == 201 || res.status == 200) {
          const user=res.data.user;
          dispatch(setLoggedInfo(user, true));
          if (user.nickName != "") {
            dispatch(setSetting(true));
          }
          else {
            dispatch(setSetting(false));
          }
        }
        else {
          //오류확인
        }
      })
  }
  return (<>
    <AppRouter isLoggedin={isLoggedin} isSetting={isSetting} userObj={userObj} />
    <Footer/>
</>
  );
}

export default App;
