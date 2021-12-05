import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from 'react';
import DaumPost from '../component/DaumPost';
import Modal from '../component/Modal';
import '../styleSheets/setting.css';
const LocationForm = ({locationObj, setLocationObj}) => {
    const [isOpenDaum, setIsOpenDaum] = useState(false);

    return (
        <>
            <span>내 동네 설정 </span>
            {isOpenDaum && <div className="address-modal-bg">
                <Modal isOpenModal={isOpenDaum} setIsOpenModal={setIsOpenDaum} children={<DaumPost setLocationObj={setLocationObj} setIsOpenModal={setIsOpenDaum} />} /></div>}
            <div className="address-detail">
                {locationObj && <span id="dong"> <><FontAwesomeIcon icon={faMapMarkerAlt} /> {locationObj.dong}</></span>}
                <span onClick={onPostClick} id="address-search-btn">{locationObj ? "주소 재검색" : "주소 검색"}</span>
            </div>
            <span id="address">{locationObj ? locationObj.detail : "동네를 설정해주세요."}</span>
        </>)
}

export default LocationForm;