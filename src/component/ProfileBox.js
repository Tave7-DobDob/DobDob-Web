import REACT, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
const ProfileBox = ({ userObj, locationId }) => {
    const history = useHistory();
    const [location, setLocation] = useState();
    useEffect(() => {
        //locaionId로 검색
        setLocation(locationId)
        //사용자와 검사
    })
    const onProfileClick = () => {
        window.localStorage.setItem("profileObj", JSON.stringify(userObj));
        history.push("/profile");
    }
    return (<>
        <div className="profile-img" onClick={onProfileClick}><img src={userObj.profileUrl ? userObj.profileUrl : "user.png"} /></div>
        <div className="sub-profile-wrapper">
            <span>{userObj.nickName}</span>
            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {location && location.dong}</span>
        </div>
    </>);
}

export default ProfileBox;