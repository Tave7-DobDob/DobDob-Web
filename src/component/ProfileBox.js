import REACT, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
import { setProfileInfo } from '../modules/profileInfo';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
const ProfileBox = ({ profileObj, location , date}) => {
    const history = useHistory();
    const dispatch=useDispatch();
    const userObj=useSelector(state=>state.user.userObj);

    const onProfileClick = () => {
        axios.get(`/user/${profileObj.id}`).then(res=>{
            dispatch(setProfileInfo(res.data.user, profileObj.id==userObj.id));
            history.push("/profile");
        })
    }
    return (<>
        <div className="profile-img" onClick={onProfileClick}><img src={profileObj.profileUrl ? profileObj.profileUrl : "profile_img.png"} /></div>
        <div className="sub-profile-wrapper">
            <span>{profileObj.nickName}</span>
            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {location && location.dong}</span>
        </div>
        {date&&<span id="date">{date.split(/[T|.]/,2).map(it=>it+" ")}</span>}
    </>);
}

export default ProfileBox;