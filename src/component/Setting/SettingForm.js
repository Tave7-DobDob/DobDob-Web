import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setSetting, setUserInfo } from '../modules/user';
import '../styleSheets/setting.css';
import LocationForm from "./LocationForm";
import NickName from "./Nickname";
const SettingForm = () => {
    const { userObj } = useSelector(state => ({ user: state.user.userObj }));
    const dispatch = useDispatch();
    const history = useHistory();
    const [nickName, setNickName] = useState("");
    const [errorMess, setErrorMess] = useState("");
    const [nickError, setNickError] = useState("");
    const [checkNick, setCheckNick] = useState(false);
    const [locationObj, setLocationObj] = useState(null);
    useEffect(() => {
        locationObj != null && setErrorMess("");
    }, [locationObj]);

    const onSubmit = (event) => {
        event.preventDefault();
        try {
            if (!checkNick) throw new Error('중복확인을 해주세요.');
            if (!locationObj) throw new Error('동네를 설정해주세요.');
            //서버 setting 정보 post 
            axios.patch(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/user/${userObj.id}`, { nickName: nickName, location: JSON.stringify(locationObj) }).then(() => {
                dispatch(setUserInfo({ ...userObj, nickName: nickName, Location: locationObj }))
                dispatch(setSetting(true));
                history.push("/");
            })
        } catch (error) {
            if (!checkNick) setNickError(error.message);
            else setErrorMess(error.message);
        }
    }

    return (
        <form onSubmit={onSubmit} className="centerContainer">
            <NickName nickError={nickError} setNickError={setNickError} checkNick={checkNick} setCheckNick={setCheckNick} nickName={nickName} setNickName={setNickName} setErrorMess={setErrorMess} />
            <div className="sub-wrapper">
                <LocationForm locationObj={locationObj} setLocationObj={setLocationObj} />
                <span id="error">{errorMess}</span>
            </div>
            <input type="submit" value="돕돕 시작하기" />
        </form>)
}

export default SettingForm;