import DaumPostCode from "react-daum-postcode";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { axiosInstance } from "./apis/instance";
const DaumPost = ({ setLocationObj, setIsOpenModal }) => {
  const onPostClick = () => {
    setIsOpenModal(false);
  };
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsOpenModal(false);
    axiosInstance
      .get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}`,
          },
        }
      )
      .then((res) => {
        const location = res.data.documents[0];
        setLocationObj({
          si: location.address.region_1depth_name,
          gu: location.address.region_2depth_name,
          dong: location.address.region_3depth_name,
          locationX: location.address.x,
          locationY: location.address.y,
          detail: fullAddress,
        });
      });
  };
  return (
    <>
      <div className="address-modal">
        <div className="address-modal-bar">
          <span>주소검색</span>
          <button onClick={onPostClick}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div>
          <DaumPostCode onComplete={handleComplete} className="post-code" />
        </div>
      </div>
    </>
  );
};
export default DaumPost;
