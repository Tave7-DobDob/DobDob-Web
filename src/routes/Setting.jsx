import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import DaumPost from "../component/DaumPost";
import Modal from "../component/Modal";
import { axiosInstance } from "../component/apis/instance";
import { setSetting, setUserInfo } from "../modules/user";
import "../styleSheets/setting.css";
const Setting = ({ userObj }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [nickName, setNickName] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const [nickError, setNickError] = useState("");
  const [checkNick, setCheckNick] = useState(false);
  const [isOpenDaum, setIsOpenDaum] = useState(false);
  const [locationObj, setLocationObj] = useState(null);
  useEffect(() => {
    locationObj != null && setErrorMess("");
  }, [locationObj]);

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      if (!checkNick) throw new Error("중복확인을 해주세요.");
      if (!locationObj) throw new Error("동네를 설정해주세요.");
      axiosInstance
        .patch(`/user/${userObj.id}`, {
          nickName: nickName,
          location: JSON.stringify(locationObj),
        })
        .then(() => {
          dispatch(
            setUserInfo({
              ...userObj,
              nickName: nickName,
              Location: locationObj,
            })
          );
          dispatch(setSetting(true));
          history.push("/");
        });
    } catch (error) {
      if (!checkNick) setNickError(error.message);
      else setErrorMess(error.message);
    }
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNickName(value);
  };
  const onCheck = () => {
    setErrorMess("");
    let valNick = /^[가-힣a-z0-9]{2,20}$/g;
    if (!valNick.test(nickName)) {
      setCheckNick(false);
      setNickError(
        "- 2자 이상 20자 이하의 영문 소문자/한글(숫자혼합 가능)\n- 공백 및 특수문자 불가"
      );
    } else {
      //DB중복확인
      axiosInstance.get(`/user/nickname/${nickName}`).then((res) => {
        setCheckNick(!res.data.isExisted);
        !res.data.isExisted
          ? setNickError("사용가능한 닉네임입니다.")
          : setNickError("이미 사용중인 닉네임입니다.");
      });
    }
  };
  const onPostClick = () => {
    setIsOpenDaum((prev) => !prev);
  };

  return (
    <>
      <div className="Container setting">
        <header>
          <img src="logo2.png" width="80px" />
        </header>
        <div className="setting-wrapper">
          <div className="text-wrapper">
            <h1>
              돕돕에서 사용할 <br /> 닉네임과 내 동네를 설정하여 <br />
              지금 바로 이웃들을 만나보세요 !
            </h1>
            <p>닉네임과 내 동네는 추후에도 변경이 가능합니다.</p>
            <img src="setting.png" width="100%" />
          </div>
          <div className="centerContainer form-wrapper-wrapper">
            <div className="centerContainer form-wrapper">
              <form onSubmit={onSubmit} className="centerContainer">
                <div className="sub-wrapper">
                  <span>닉네임</span>
                  <div className="nickname-wrapper">
                    <input
                      type="text"
                      required
                      value={nickName}
                      onChange={onChange}
                      placeholder="최소 2자 이상"
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
                <div className="sub-wrapper">
                  <span>내 동네 설정 </span>
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

                  <div className="address-detail">
                    {locationObj && (
                      <span id="dong">
                        {" "}
                        <>
                          <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                          {locationObj.dong}
                        </>
                      </span>
                    )}
                    <span onClick={onPostClick} id="address-search-btn">
                      {locationObj ? "주소 재검색" : "주소 검색"}
                    </span>
                  </div>
                  <span id="address">
                    {locationObj ? locationObj.detail : "동네를 설정해주세요."}
                  </span>

                  <span id="error">{errorMess}</span>
                </div>
                <input type="submit" value="돕돕 시작하기" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
