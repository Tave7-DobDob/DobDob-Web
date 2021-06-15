import REACT, { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const DaumPost = ({ setAddress, setLocationObj }) => {

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
            headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_KEY}` },
        })
            .then(res => {
                const location = res.data.documents[0];
                setLocationObj({
                    si: location.address.region_1depth_name,
                    gu: location.address.region_2depth_name,
                    dong: location.address.region_3depth_name,
                    locationX: location.address.x,
                    locationY: location.address.y,
                    fullAddress:fullAddress
                })
            })
    }
    return (<>
        {isOpenModal && <div className="address-modal-bg">
            <div className="address-modal">
                <span onClick={onPostClick}><FontAwesomeIcon icon={faTimes}/></span>
                <div><DaumPostCode onComplete={handleComplete} className="post-code" /></div>
            </div>
        </div>}</>);
}
export default DaumPost;