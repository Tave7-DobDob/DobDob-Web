import REACT, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
import { setProfileInfo } from '../modules/profileInfo';
import { useDispatch, useSelector } from 'react-redux';
const ProfileBox = ({ profileObj, locationId }) => {
    const history = useHistory();
    const dispatch=useDispatch();
    const userObj=useSelector(state=>state.user.userObj);
    const [location, setLocation] = useState();
    useEffect(() => {
        //locaionId로 검색
        setLocation(locationId)
        //profileObj.userId로 검색
    })
    const onProfileClick = () => {
        dispatch(setProfileInfo(profileObj, profileObj.userId==userObj.userId));
        history.push("/profile");
    }
    return (<>
        <div className="profile-img" onClick={onProfileClick}><img src={profileObj.profileUrl ? profileObj.profileUrl : "user.png"} /></div>
        <div className="sub-profile-wrapper">
            <span>{profileObj.nickName}</span>
            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {location && location.dong}</span>
        </div>
    </>);
}

export default ProfileBox;