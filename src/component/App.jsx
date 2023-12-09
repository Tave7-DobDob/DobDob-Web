import AppRouter from "./Router";
import { useEffect } from "react";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInfo, setSetting } from "../modules/user";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./Footer";
import { axiosInstance } from "./apis/instance";
function App() {
  const dispatch = useDispatch();
  const { userObj, isLoggedin, isSetting } = useSelector((state) => ({
    userObj: state.user.userObj,
    isLoggedin: state.user.isLoggedin,
    isSetting: state.user.isSetting,
  }));
  const accessToken = JSON.parse(window.localStorage.getItem("token"));
  if (accessToken) {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `${accessToken.access_token}`;
  }

  const query = queryString.parse(window.location.search);

  useEffect(() => {
    if (query.code) {
      getKakaoTokenHandler(query);
    } else {
      if (userObj == null || !accessToken.access_token) {
        dispatch(setLoggedInfo(null, false));
        window.localStorage.removeItem("token");
      } else {
        sendJwtTokenToServer();
      }
    }
  }, []);

  const getKakaoTokenHandler = async (query) => {
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.REACT_APP_KAKAO_REST_KEY,
      redirect_uri: "https://tave7-dobdob.github.io/DobDob-Web/",
      code: query.code,
    };
    const queryString = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    axiosInstance
      .post("https://kauth.kakao.com/oauth/token", queryString, {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((res) => {
        sendKakaoTokenToServer({
          access_token: res.data.access_token,
        });
        window.history.replaceState(
          {},
          null,
          window.location.origin +
            window.location.pathname +
            window.location.hash
        );
      });
  };
  //일반 로그인
  const sendKakaoTokenToServer = (token) => {
    axiosInstance
      .post(
        "http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/auth/kakao",
        { ...token }
      )
      .then((res) => {
        if (res.status == 201 || res.status == 200) {
          window.localStorage.setItem(
            "token",
            JSON.stringify({
              access_token: res.data.jwt,
            })
          );
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `${res.data.jwt}`;

          const user = res.data.user;
          dispatch(setLoggedInfo(user, true));
          if (user.nickName != "") {
            dispatch(setSetting(true));
          } else {
            dispatch(setSetting(false));
          }
        } else {
          window.alert("로그인에 실패하였습니다.");
        }
      });
  };
  //자동로그인
  const sendJwtTokenToServer = () => {
    axiosInstance
      .post(
        "http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/auth/kakao"
      )
      .then((res) => {
        if (res.status == 200) {
          const user = res.data.user;
          dispatch(setLoggedInfo(user, true));
          if (user.nickName != "") {
            dispatch(setSetting(true));
          } else {
            dispatch(setSetting(false));
          }
        } else {
          window.alert("로그인에 실패하였습니다.");
          dispatch(setLoggedInfo(null, false));
          window.localStorage.removeItem("token");
        }
      });
  };
  return (
    <>
      <AppRouter
        isLoggedin={isLoggedin}
        isSetting={isSetting}
        userObj={userObj}
      />
      <Footer />
    </>
  );
}

export default App;
