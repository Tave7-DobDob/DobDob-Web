import { faMapMarkerAlt, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DaumPost from '../component/DaumPost';
import Modal from '../component/Modal';
import '../styleSheets/main.css';
const Location = ({ locationObj, setLocationObj }) => {
    const [isOpenDaum, setIsOpenDaum] = useState(false);

    const onClickLocation = () => {
        setIsOpenDaum(prev => !prev);
    }
    return (
        <>
            {isOpenDaum &&
                <div className="address-modal-bg">
                    <Modal isOpenModal={isOpenDaum} setIsOpenModal={setIsOpenDaum}>
                        <DaumPost setLocationObj={setLocationObj} setIsOpenModal={setIsOpenDaum} />
                    </Modal>
                </div>}
            <div className="location-wrapper">
                <span className="label">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> 나의 동네<FontAwesomeIcon id="icon" icon={faSlidersH} onClick={onClickLocation} data-toggle="tooltip" title="동네 재설정" />
                </span>
                <span>{locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
            </div>
        </>)
}

export default Location;