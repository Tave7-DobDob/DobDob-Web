import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DaumPost from '../component/DaumPost';
import Modal from '../component/Modal';
import '../styleSheets/posting.css';
const Head = ({ setFileArr }) => {
    const userObj = useSelector(state => state.user.userObj);
    const [locationObj, setLocationObj] = useState(userObj.Location);
    const [isOpenDaum, setIsOpenDaum] = useState(false);
    const onClickLocation = () => {
        setIsOpenDaum(true);
    }
    return (
        <>
            {isOpenDaum && <div className="address-modal-bg">
                <Modal isOpenModal={isOpenDaum} setIsOpenModal={setIsOpenDaum}>
                    <DaumPost setLocationObj={setLocationObj} setIsOpenModal={setIsOpenDaum} />
                </Modal></div>}
            <div className="menu-wrapper">
                <span className="location" data-toggle="tooltip" title="위치 재설정" onClick={onClickLocation}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} id="marker" color="#ffc600" />
                    {locationObj ? locationObj.dong : "동네를 설정해주세요."}
                </span>
                <label for="photo-upload" data-toggle="tooltip" title="사진 첨부">
                    <FontAwesomeIcon icon={faImages} />
                    <span>사진(최대 5장)</span>
                </label>
                <input multiple="multiple" type="file" onChange={setFileArr} id="photo-upload" style={{ display: "none" }} />
            </div>
        </>)
}
export default Head;
