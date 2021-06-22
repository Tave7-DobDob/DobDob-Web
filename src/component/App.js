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
  const [token] = useState(JSON.parse(window.localStorage.getItem('token')));
  const query = queryString.parse(window.location.search);

  useEffect(() => {
    if (window.location.pathname == "/oauth") {
      //로그인 후 토큰 발급
      getKakaoTokenHandler(query);
    }
    else {
      if (userObj!=null&&token&&(new Date().getTime()-token.received_at)>0) {
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
        //slocalStorage.removeItem("token");
      }
    }

  }, []);
  
  useEffect(() => {
    //userID로 userObj 검색
    /*userID로 DB검색후, 토큰 만료 시, 로그아웃*/
    //getUserfromServer(token);
  }, [userObj]);
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
      window.localStorage.setItem("token", JSON.stringify({
        access_token: res.data.access_token, 
        refresh_token: res.data.refresh_token,
        refresh_token_expires_in: 5183999,
        received_at:new Date().getTime()
      }));
      //서버에 user정보 요청
      console.log(res.data);
      getUserfromServer(res.data);
      window.history.replaceState({}, null, window.location.origin + window.location.hash);
    });
  }
  //토큰으로 서버에 user요청
  const getUserfromServer = (token) => {
    axios.post('http://localhost:8001/auth/kakao', {...token })
      .then(res => {
        if (res.status == 200||res.status == 201) {
          //setting 검사
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
    <AppRouter isLoggedin={isLoggedin} isSetting={isSetting} userObj={userObj} token={token} getUserfromServer={getUserfromServer} />
    <footer><span>dobdob 2021 footer</span></footer></>
  );
}

export default App;
