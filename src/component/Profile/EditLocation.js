import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import DaumPost from '../component/DaumPost';
import Modal from '../component/Modal';
import '../styleSheets/profile.css';
const EditLocation = ({locationObj, setLocationObj, editUser}) => {
    const [isOpenDaum, setIsOpenDaum] = useState(false);

    const onClickLocation = () => {
        setIsOpenDaum(prev => !prev);
    }

    return (
        <>
            {isOpenDaum && <div className="address-modal-bg">
                <Modal isOpenModal={isOpenDaum} setIsOpenModal={setIsOpenDaum} children={<DaumPost setLocationObj={setLocationObj} setIsOpenModal={setIsOpenDaum} />} /></div>}
            <div className="row-container">
                <span className="label-span">나의 동네</span>
                <div className="address-form-wrapper">
                    <div className="address-detail">
                        {locationObj && <span id="dong"> <><FontAwesomeIcon icon={faMapMarkerAlt} /> {editUser.Location.dong}</></span>}
                        <span onClick={onClickLocation} id="address-search-btn">{editUser.Location.detail ? "주소 재검색" : "주소 검색"}</span>
                    </div>
                    <span id="address">{editUser.Location.detail ? editUser.Location.detail : "동네를 설정해주세요."}</span>
                </div>
            </div>
        </>
    );
}

export default EditLocation;