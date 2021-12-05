import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFileInput } from '../component/useInput';
import { setProfileInfo } from '../modules/profileInfo';
import { setUserInfo } from '../modules/user';
import '../styleSheets/profile.css';
import EditLocation from "./EditLocation";
import EditPersonalInfo from "./EditPersonalInfo";
import EditProfileImg from "./EditProfileImg";
const EditProfile = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => ({
        user: state.profileInfo.profileObj,
        isOwner: state.profileInfo.isOwner
    }))
    const [checkNick, setCheckNick] = useState(false);
    const [nickError, setNickError] = useState("");

    const [locationObj, setLocationObj] = useState(user.Location);
    const [profileImage, setProfileImage, profileUrl, _] = useFileInput(null, user.profileUrl);
    useEffect(() => {
        setEditUser(editUser => ({ ...editUser, Location: locationObj, profileUrl: profileUrl }));
    }, [locationObj, profileUrl])



    const [editUser, setEditUser] = useState(user);
    const onChange = (event) => {
        const { target: { value, name } } = event;
        setEditUser(editUser => ({ ...editUser, [name]: value }))
    }
    const onSubmit = (event) => {
        event.preventDefault();
        try {
            if (JSON.stringify(user) === JSON.stringify(editUser)) {
                setIsEdit(false);
            }
            else {
                if (user.nickName != editUser.nickName && !checkNick) throw new Error('중복확인을 해주세요.');

                const userprofile = { nickName: editUser.nickName, location: JSON.stringify(locationObj) }
                if (profileImage) {
                    const formData = new FormData();
                    formData.append('profileImage', profileImage[0])
                    axios.patch(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/user/profile/${user.id}`, formData).then(res => {
                        res.status == 200 &&
                            axios.patch(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/user/${user.id}`, userprofile)
                    })
                }
                else {
                    axios.patch(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/user/${user.id}`, userprofile)
                }
                dispatch(setUserInfo({ ...editUser, profileUrl: profileUrl }));
                dispatch(setProfileInfo({ ...editUser, profileUrl: profileUrl }, true));
                setIsEdit(false);
                setNickError("");
            }
        } catch (error) {
            if (!checkNick) setNickError(error.message);
        }
    }

    return (
        <div className=" centerContainer profile-edit-wrapper">
            <form className="centerContainer" onSubmit={onSubmit}>
                <div className="centerContainer profile-edit-wrapper2">
                    <EditProfileImg profileUrl={editUser.profileUrl} setProfileImage={setProfileImage} />
                    <div className="centerContainer sub-profile-wrapper">
                        <EditPersonalInfo checkNick={checkNick} setCheckNick={setCheckNick} nickError={nickError} setNickError={setNickError} onChange={onChange} editUser={editUser} />
                        <EditLocation locationObj={locationObj} setLocationObj={setLocationObj} editUser={editUser} />
                    </div>
                </div>
                <input type="submit" value="완료" />
            </form>
        </div>
    );
}

export default EditProfile;