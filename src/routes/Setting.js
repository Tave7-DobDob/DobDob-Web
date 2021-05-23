import REACT, { useState } from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import DaumPostCode from 'react-daum-postcode';
import PopupDom from '../component/PopupDom';
import Modal from '../component/Modal';
import axios from 'axios';
const Setting = () => {
    const [nickname, setNickname] = useState("");
    const [errorMess, setErrorMess] = useState("");
    const [checkError, setCheckError] = useState("");
    const [checkNick, setCheckNick] = useState(false);
    const history = useHistory();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [address, setAddress] = useState("");
    const [addressObj, setAddressObj] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();
        //설정값 post
        try {
            if (!checkNick) throw new Error('중복확인을 해주세요.');
            if (!addressObj) throw new Error('동네를 설정해주세요.');

            history.push("/main");
        } catch (error) {
            if (!checkNick) setCheckError(error.message);
            else setErrorMess(error.message);
            console.log(error.message)
        }
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNickname(value);
    }
    const onCheck = () => {
        //중복확인
        setCheckNick(true);
        setCheckError("");
    }
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
        <div className="Container setting">
            <header><img src="logo2.png" width="80px" /></header>

            <div className="setting-wrapper">
                <div className="text-wrapper">
                    <h1>돕돕에서 사용할 <br /> 닉네임과 나의 동네를 설정하여 <br />지금 이웃들을 만나보세요 !</h1>
                    <p>닉네임과 나의 동네는 추후에도 변경이 가능합니다.</p>
                    <img src="setting.png" width="100%" />
                </div>
                <div className="centerContainer form-wrapper-wrapper">
                    <div className="centerContainer form-wrapper">
                        <form onSubmit={onSubmit} className="centerContainer">
                            <div className="sub-wrapper">
                                <span style={{fontWeight:600}}>닉네임</span>
                                <div className="nickname-wrapper">
                                    <input type="text" required value={nickname} onChange={onChange} placeholder="중복 불가" />
                                    <span onClick={onCheck} id="check-btn">중복확인</span>
                                </div>
                                <span id="error">{checkError}</span>
                            </div>

                            <div className="sub-wrapper">
                                <span style={{fontWeight:600}}>내 동네 설정 <FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                                {isOpenModal && <div className="address-modal-bg">
                                    <div className="address-modal">
                                        
                                    <span onClick={onPostClick}><FontAwesomeIcon icon={faTimes}  /> 창닫기</span>
                                    <div><DaumPostCode onComplete={handleComplete} className="post-code" /></div>
                                </div>
                                    </div>}
                                <span onClick={onPostClick} id="address-search-btn">주소 검색</span>
                                <div className="address-detail">
                                    <span>{addressObj ? addressObj.address.region_1depth_name : "시/도"}</span>
                                    <span>{addressObj ? addressObj.address.region_2depth_name : "구/군"}</span>
                                    <span>{addressObj ? addressObj.address.region_3depth_name : "동/읍"}</span>
                                </div>
                                <span id="address">{address}</span>

                                <span id="error">{errorMess}</span>
                            </div>

                            <input type="submit" value="완료" />
                        </form>

                    </div>
                </div>

            </div>
        </div></>)
}

export default Setting;