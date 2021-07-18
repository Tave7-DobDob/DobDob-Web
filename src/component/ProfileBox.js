import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router';
import { setProfileInfo } from '../modules/profileInfo';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import PropTypes from 'prop-types';

const ProfileBox = ({ profileObj, location, date }) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const userObj = useSelector(state => state.user.userObj);

    const onProfileClick = () => {
        axios.get(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/user/${profileObj.id}`).then(res => {
            dispatch(setProfileInfo(res.data.user, profileObj.id == userObj.id));
            history.push("/profile");
        })
    }
    return (<>
        <div className="profile-img" onClick={onProfileClick}><img src={profileObj.profileUrl ? profileObj.profileUrl :"img_p.png"} /></div>
        <div className="row-container sub-profile-wrapper2">
            <div className="sub-profile-wrapper">
                <span>{profileObj.nickName}</span>
               {location&&<span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {location.dong}</span>}
            </div>
            {date && <span id="date">{date.split(/[T|.]/, 2).map(it => it + " ")}</span>}
        </div>
    </>);
}

ProfileBox.proTypes={
    profileObj:PropTypes.shape({
        id:PropTypes.number,
        nickName:PropTypes.string,
        profileUrl:PropTypes.string,
    }),
    location:PropTypes.shape({
        dong: PropTypes.string,
    })
}

export default React.memo(ProfileBox);