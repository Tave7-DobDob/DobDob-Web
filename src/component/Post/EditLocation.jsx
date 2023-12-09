import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from 'react';
import DaumPost from '../DaumPost';
import Modal from '../Modal';
const EditLocation = ({ locationObj, setLocationObj }) => {
    const [isOpenDaum, setIsOpenDaum] = useState(false);
    const onClickLocation = () => {
        setIsOpenDaum(true);
    }

    return (<>
        {isOpenDaum && <div className="address-modal-bg">
            <Modal isOpenModal={isOpenDaum} setIsOpenModal={setIsOpenDaum}>
                <DaumPost setLocationObj={setLocationObj} setIsOpenModal={setIsOpenDaum} />
            </Modal></div>}
        <div className="menu-wrapper">
            <span className="location" data-toggle="tooltip" title="위치 재설정" onClick={onClickLocation}><FontAwesomeIcon icon={faMapMarkerAlt} id="marker" color="#ffc600" /> {locationObj ? locationObj.dong : "동네를 설정해주세요."}</span>
        </div>
    </>)
}
export default EditLocation;
