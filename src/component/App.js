import AppRouter from './Router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInfo, setSetting } from '../modules/user';
function App() {
  const dispatch = useDispatch();
  const { userObj, isLoggedin, isSetting } = useSelector(state => ({
    userObj: state.user.userObj,
    isLoggedin: state.user.isLoggedin,
    isSetting: state.user.isSetting
  }))
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const query = queryString.parse(window.location.search);

  useEffect(() => {
    if (window.location.pathname == "/oauth") {
      //로그인 후 토큰 발급
      getKakaoTokenHandler(query);
    }
    else {
      if (window.localStorage.getItem('userObj') != null) {
        //dispatch(setLoggedInfo(JSON.parse(window.localStorage.getItem("userObj")), true));
        //user setting정보 확인
        if(userObj.nickName!=""){
          dispatch(setSetting(true));
        }
        else{
          dispatch(setSetting(false));
        }
      }
      else {
        dispatch(setLoggedInfo(null, false));
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
      //발급받은 액세스 토큰 저장
      window.localStorage.setItem("token", JSON.stringify(res.data.access_token));
      //서버에 user정보 요청
      getUserfromServer(res.data);
      window.history.replaceState({}, null, window.location.origin + window.location.hash);
    });
  }
  //토큰으로 서버에 user요청
  const getUserfromServer = (token) => {
    axios.post('http://localhost:8001/auth/kakao', { kakaoToken: token })
      .then(res => {
        if (res.status == 201) {
          const user = {
            userId: 1,
            profileUrl: "test_profile.jpg",
            nickName: "",
            email: res.data.email,
            locationId: { dong: "상도동", fullAddress: "서울 동작구 성대로21길 36 (상도동, 우주빌B)" }
          }
          window.localStorage.setItem("userObj", JSON.stringify(user));
          //setting 검사
          //if(res.data.nickName!="")
          if (user.nickName != "") {
            dispatch(setSetting(true));
          }
          else {
            dispatch(setSetting(false));
          }
          //dispatch(setLoggedInfo(res.data, true));
          dispatch(setLoggedInfo(user, true));
        }
        else {
          //오류확인
        }
      })
  }
  return (<>
    <AppRouter isLoggedin={isLoggedin} isSetting={isSetting} userObj={userObj} token={token} getUserfromServer={getUserfromServer} />
    <footer><span>dobdob 2021 footer</span></footer></>
  );
}

export default App;
