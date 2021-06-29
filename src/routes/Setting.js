import REACT, { useState,useEffect } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import DaumPost from '../component/DaumPost';
import { useDispatch } from 'react-redux';
import user, { setSetting, setUserInfo } from '../modules/user';
import './setting.css';
import axios from 'axios';
const Setting = ({userObj}) => {
    const dispatch=useDispatch();
    const history = useHistory();
    const [nickName, setNickName] = useState("");
    const [errorMess, setErrorMess] = useState("");
    const [nickError, setNickError] = useState("");
    const [checkNick, setCheckNick] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [locationObj, setLocationObj] = useState(null);
    useEffect(() => {
        if (locationObj != null) {
            setErrorMess("");
        }
        //postArr검색
    }, [locationObj])
    const onSubmit = (event) => {
        event.preventDefault();
        //설정값 post
        try {
            if (!checkNick) throw new Error('중복확인을 해주세요.');
            if (!locationObj) throw new Error('동네를 설정해주세요.');
            //서버 setting 정보 post 
            //axios.patch(`/user/${userObj.Id}`,{nickName:nickname, location:locationObj})
            dispatch(setUserInfo({...userObj,nickName:nickName, locationId:locationObj}))
            dispatch(setSetting(true));
            history.push("/");
        } catch (error) {
            if (!checkNick) setNickError(error.message);
            else setErrorMess(error.message);
        }
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNickName(value);
    }
    const onCheck = () => {
        setErrorMess("");        
        let valNick=/^[a-z]+[0-9a-z]+[a-z0-9]{2,20}$/g;
        if(!valNick.test(nickName)){
            setCheckNick(false);
            setNickError('- 2자 이상 20자 이하의 영문 소문자/한글(숫자혼합 가능)\n- 공백 및 특수문자 불가')
        }
        else{
            //DB중복확인
            axios.get(`/user/nickname/${nickName}`).then(res=>{
                setCheckNick(!res.data.isExisted)
                if(!res.data.isExisted){
                    setNickError("사용가능한 닉네임입니다.");
                }
                else{
                    setNickError("이미 사용중인 닉네임입니다.");
                }
            });

        }
    }
    const onPostClick = () => {
        setIsOpenModal(prev => !prev);
    }

    return (<>
        <div className="Container setting">
            <header><img src="logo2.png" width="80px" /></header>

            <div className="setting-wrapper">
                <div className="text-wrapper">
                    <h1>돕돕에서 사용할 <br /> 닉네임과 내 동네를 설정하여 <br />지금 바로 이웃들을 만나보세요 !</h1>
                    <p>닉네임과 내 동네는 추후에도 변경이 가능합니다.</p>
                    <img src="setting.png" width="100%" />
                </div>
                <div className="centerContainer form-wrapper-wrapper">
                    <div className="centerContainer form-wrapper">
                        <form onSubmit={onSubmit} className="centerContainer">
                            <div className="sub-wrapper">
                                <span>닉네임</span>
                                <div className="nickname-wrapper">
                                    <input type="text" required value={nickName} onChange={onChange} placeholder="최소 2자 이상" />
                                    <span onClick={onCheck} id="check-btn">중복확인</span>
                                </div>
                                {checkNick?<span id="nick-error" style={{color:'#00aa7d'}}>{nickError}</span>:
                                <span id="nick-error">{nickError.split("\n").map(it=><>{it}<br/></>)}</span>}
                            </div>

                            <div className="sub-wrapper">
                                <span>내 동네 설정 </span>
                                {isOpenModal && <DaumPost setLocationObj={setLocationObj} />}
                                
                                <div className="address-detail">
                                {locationObj &&<span id="dong"> <><FontAwesomeIcon icon={faMapMarkerAlt}/> {locationObj.dong}</></span>}
                                    <span onClick={onPostClick} id="address-search-btn">{locationObj?"주소 재검색":"주소 검색"}</span>
                                </div>
                                <span id="address">{locationObj?locationObj.fullAddress:"동네를 설정해주세요."}</span>

                                <span id="error">{errorMess}</span>
                            </div>

                            <input type="submit" value="돕돕 시작하기" />
                        </form>

                    </div>
                </div>

            </div>
        </div></>)
}

export default Setting;