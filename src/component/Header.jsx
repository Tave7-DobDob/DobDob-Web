import {
  faCaretDown,
  faSearch,
  faSignOutAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setProfileInfo } from "../modules/profileInfo";
import { setLoggedInfo } from "../modules/user";
import "../styleSheets/header.css";
import Modal from "./Modal";
import { axiosInstance } from "./apis/instance";
const Header = ({
  onSubmit,
  setSearch,
  search,
  userObj,
  locationObj,
  setPostList,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearch(value);
  };
  const onClickshap = () => {
    setSearch("#");
  };

  const onClickMyPage = () => {
    dispatch(setProfileInfo(userObj, true));
    history.push("/profile");
  };

  const onClickLogo = () => {
    search != undefined && setSearch("");
    history.push("/");
    if (locationObj != undefined) {
      axiosInstance
        .post("/post/list", {
          data: {
            locationX: parseFloat(locationObj.locationX),
            locationY: parseFloat(locationObj.locationY),
          },
        })
        .then((res) => {
          setPostList(res.data.posts);
        });
    }
  };

  const onClickLogout = () => {
    dispatch(setLoggedInfo(null, false));
    axios
      .get(
        `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_REST_KEY}&logout_redirect_uri=https://tave7-dobdob.github.io/DobDob-Web/logout`
      )
      .then(() => {
        window.localStorage.clear();
        history.push("/");
        window.location.replace("/");
      });
  };
  const [isOpenMoal, setIsOpenModal] = useState(false);
  const onModalClick = () => {
    setIsOpenModal(true);
  };

  return (
    <header>
      <img src="logo2.png" width="60px" onClick={onClickLogo} />
      {search != undefined && (
        <form className="row-container" onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onChange}
            placeholder="제목 및 태그를 검색해보세요 !"
            value={search}
          />
          <input
            type="submit"
            value="검색"
            id="search-btn"
            style={{ display: "none" }}
          />
          <span id="tag-char-btn" onClick={onClickshap}>
            #
          </span>
          <label id="search-btn-label" for="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </label>
        </form>
      )}
      {userObj && (
        <div className="profile-wrapper">
          <div
            onClick={onClickMyPage}
            className="profile-img"
            data-toggle="tooltip"
            title="마이 페이지"
          >
            <img src={userObj.profileUrl ? userObj.profileUrl : "img_p.png"} />
          </div>
          <span>{userObj.nickName}</span>
          <Modal
            isOpenMoal={isOpenMoal}
            setIsOpenModal={setIsOpenModal}
            children={
              <>
                <button onClick={onModalClick} id="menu-btn">
                  <FontAwesomeIcon icon={faCaretDown} />
                </button>
                {isOpenMoal && (
                  <div className="profile-modal">
                    <button onClick={onClickMyPage}>
                      <FontAwesomeIcon icon={faUserCircle} id="icon" /> 프로필
                      보기
                    </button>
                    <button id="logout" onClick={onClickLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} id="icon" /> 로그아웃
                    </button>
                  </div>
                )}
              </>
            }
          ></Modal>
        </div>
      )}
    </header>
  );
};

export default Header;
