import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DaumPost from "../components/DaumPost";
import Header from "../components/Header";
import Modal from "../components/Modal";
import PostContainer from "../components/PostContainer";
import { axiosInstance } from "../components/apis/instance";
import { useFileInput } from "../components/hooks/useInput";
import { setProfileInfo } from "../modules/profileInfo";
import { setUserInfo } from "../modules/user";
import "../styleSheets/profile.css";
const Profile = () => {
  const dispatch = useDispatch();

  const { user, isOwner } = useSelector((state) => ({
    user: state.profileInfo.profileObj,
    isOwner: state.profileInfo.isOwner,
  }));
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    axiosInstance.get(`/user/${user.id}/posts`).then((res) => {
      setPostList(res.data.posts);
    });
  }, [user]);

  const [isEdit, setIsEdit] = useState(false);
  const onEditClick = () => {
    setIsEdit(true);
  };

  const [checkNick, setCheckNick] = useState(false);
  const [nickError, setNickError] = useState("");
  const onCheck = () => {
    let valNick = /^[가-힣a-z0-9]{2,20}$/g;
    if (!valNick.test(editUser.nickName)) {
      setCheckNick(false);
      setNickError(
        "- 2자 이상 20자 이하의 영문 소문자/한글(숫자혼합 가능)\n- 공백 및 특수문자 불가"
      );
    } else if (user.nickName === editUser.nickName) {
      setCheckNick(true);
      setNickError("사용가능한 닉네임입니다.");
    } else {
      axiosInstance.get(`/user/nickname/${editUser.nickName}`).then((res) => {
        setCheckNick(!res.data.isExisted);
        !res.data.isExisted
          ? setNickError("사용가능한 닉네임입니다.")
          : setNickError("이미 사용중인 닉네임입니다.");
      });
    }
  };

  const [locationObj, setLocationObj] = useState(user.Location);
  const [isOpenDaum, setIsOpenDaum] = useState(false);

  const [profileImage, setProfileImage, profileUrl, _] = useFileInput(
    null,
    user.profileUrl
  );
  useEffect(() => {
    setEditUser((editUser) => ({
      ...editUser,
      Location: locationObj,
      profileUrl: profileUrl,
    }));
  }, [locationObj, profileUrl]);
  const onClickLocation = () => {
    setIsOpenDaum((prev) => !prev);
  };

  const [editUser, setEditUser] = useState(user);
  const onChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setEditUser((editUser) => ({ ...editUser, [name]: value }));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    try {
      if (JSON.stringify(user) === JSON.stringify(editUser)) {
        setIsEdit(false);
      } else {
        if (user.nickName !== editUser.nickName && !checkNick)
          throw new Error("중복확인을 해주세요.");

        const userprofile = {
          nickName: editUser.nickName,
          location: JSON.stringify(locationObj),
        };
        if (profileImage) {
          const formData = new FormData();
          formData.append("profileImage", profileImage[0]);
          axiosInstance
            .patch(`/user/profile/${user.id}`, formData)
            .then((res) => {
              res.status === 200 &&
                axiosInstance.patch(`/user/${user.id}`, userprofile);
            });
        } else {
          axiosInstance.patch(`/user/${user.id}`, userprofile);
        }
        dispatch(setUserInfo({ ...editUser, profileUrl: profileUrl }));
        dispatch(setProfileInfo({ ...editUser, profileUrl: profileUrl }, true));
        setIsEdit(false);
        setIsOpenDaum(false);
        setNickError("");
      }
    } catch (error) {
      if (!checkNick) setNickError(error.message);
    }
  };

  return (
    <div className="Container profile">
      <Header />
      <div className="centerContainer wrapper">
        <div className="centerContainer main-content">
          {!isEdit ? (
            <>
              <div className="centerContainer profile-wrapper">
                <div className="profile-img-wrapper">
                  <div className="profile-img">
                    <img
                      src={user.profileUrl ? user.profileUrl : "img_p.png"}
                    />
                  </div>
                </div>
                <div className="sub-profile-wrapper">
                  <span id="nickName">{user.nickName}</span>
                  <span id="profile-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                    {user.Location.dong}
                  </span>
                  {isOwner && (
                    <div className="edit-btn-wrapper" onClick={onEditClick}>
                      <span className="edit-btn">프로필 수정</span>
                    </div>
                  )}
                </div>
              </div>
              <span>{user.nickName}님이 작성한 글</span>
              <hr />
              {postList.map((post) => (
                <PostContainer userObj={user} postObj={post} />
              ))}
            </>
          ) : (
            <div className=" centerContainer profile-edit-wrapper">
              <form className="centerContainer" onSubmit={onSubmit}>
                <div className="centerContainer profile-edit-wrapper2">
                  <div className="centerContainer profile-img-wrapper">
                    <div className="profile-img">
                      <img
                        src={
                          editUser.profileUrl
                            ? editUser.profileUrl
                            : "img_p.png"
                        }
                      />
                    </div>
                    <label for="profile-img-upload" id="edit-profile-img-btn">
                      프로필 사진 수정
                    </label>
                    <input
                      type="file"
                      onChange={setProfileImage}
                      id="profile-img-upload"
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="centerContainer sub-profile-wrapper">
                    <div className="row-container">
                      <span className="label-span">닉네임</span>
                      <div className="col-container">
                        <div className="nickname-wrapper">
                          <input
                            type="text"
                            name="nickName"
                            required
                            value={editUser.nickName}
                            placeholder="닉네임"
                            onChange={onChange}
                          />
                          <span onClick={onCheck} id="check-btn">
                            중복확인
                          </span>
                        </div>
                        {checkNick ? (
                          <span id="nick-error" style={{ color: "#00aa7d" }}>
                            {nickError}
                          </span>
                        ) : (
                          <span id="nick-error">
                            {nickError.split("\n").map((it) => (
                              <>
                                {it}
                                <br />
                              </>
                            ))}
                          </span>
                        )}
                      </div>
                    </div>

                    {isOpenDaum && (
                      <div className="address-modal-bg">
                        <Modal
                          isOpenModal={isOpenDaum}
                          setIsOpenModal={setIsOpenDaum}
                          children={
                            <DaumPost
                              setLocationObj={setLocationObj}
                              setIsOpenModal={setIsOpenDaum}
                            />
                          }
                        />
                      </div>
                    )}
                    <div className="row-container">
                      <span className="label-span">나의 동네</span>
                      <div className="address-form-wrapper">
                        <div className="address-detail">
                          {locationObj && (
                            <span id="dong">
                              {" "}
                              <>
                                <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                                {editUser.Location.dong}
                              </>
                            </span>
                          )}
                          <span
                            onClick={onClickLocation}
                            id="address-search-btn"
                          >
                            {editUser.Location.detail
                              ? "주소 재검색"
                              : "주소 검색"}
                          </span>
                        </div>
                        <span id="address">
                          {editUser.Location.detail
                            ? editUser.Location.detail
                            : "동네를 설정해주세요."}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="submit" value="완료" />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
