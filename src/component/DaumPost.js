import REACT, { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const DaumPost = ({ setAddress, setAddressObj }) => {

    const [isOpenModal, setIsOpenModal] = useState(true);
    const onPostClick = () => {
        setIsOpenModal(prev => !prev);
    }
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setAddress(fullAddress);
        setIsOpenModal(false);
        axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`, {
            headers: { Authorization: 'KakaoAK 14524cc95ffb83fa772e7ebe7d3d7059' },
        })
            .then(res => {
                setAddressObj(res.data.documents[0]);
            })
    }
    return (<>
        {isOpenModal && <div className="address-modal-bg">
            <div className="address-modal">

                <span onClick={onPostClick}><FontAwesomeIcon icon={faTimes} /> 창닫기</span>
                <div><DaumPostCode onComplete={handleComplete} className="post-code" /></div>
            </div>
        </div>}</>);
}
export default DaumPost;