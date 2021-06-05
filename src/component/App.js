import AppRouter from './Router';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import queryString from 'query-string';
function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [token, setToken] = useState({});
  const [userObj, setUserObj] = useState({
    userId:1,
    nickName: "김지현",
    locationId: { dong: "상도동" ,fullAddress:"서울 동작구 성대로21길 36 (상도동, 우주빌B)"}
  });
  const query = queryString.parse(window.location.search);

  useEffect(() => {
    
    //로그인 확인
    //초기설정 확인
    if (JSON.parse(window.localStorage.getItem("userObj")) || 0) {
      setIsLoggedin(true);
      //user setting정보 확인
      setIsSetting(true);
    }
    else{
      setIsLoggedin(false);
    }

    if (window.location.pathname == "/oauth") {
      //로그인 후 토큰 발급
      getKakaoTokenHandler(query);
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
    })
      .then((res) => {
        //발급받은 토큰 저장
        setToken(res.data);
        //서버에 요청
        getUserfromServer(res.data);
        window.history.replaceState({}, null, window.location.origin + window.location.hash);
      });
  }
  //토큰으로 서버에 user요청
  const getUserfromServer = (token) => {
    axios.post('http://localhost:8001/auth/kakao', { kakaoToken: JSON.stringify(token) })
      .then(res => {
        if (res.status == 201) {
          //setUserObj(res.data);
          //window.localStorage.setItem("userObj", JSON.stringify({...res.data,token:token.access_token}));
          window.localStorage.setItem("userObj", JSON.stringify({ ...userObj, token: token.access_token }));
          setIsSetting(false);
          //setting 검사
          setIsLoggedin(true);

        }
        else {
          //오류확인
        }
      })
  }
  return (<>
    <AppRouter isLoggedin={isLoggedin} isSetting={isSetting} userObj={userObj} setIsSetting={setIsSetting} />
    <footer><span>dobdob 2021 footer</span></footer></>
  );
}

export default App;
