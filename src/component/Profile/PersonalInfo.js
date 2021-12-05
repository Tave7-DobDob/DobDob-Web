import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';
import '../styleSheets/profile.css';
const PersonalInfo = ({ setIsEdit }) => {
    const { user, isOwner } = useSelector(state => ({
        user: state.profileInfo.profileObj,
        isOwner: state.profileInfo.isOwner
    }));
    const onEditClick = () => {
        setIsEdit(true);
    }

    return (
        <div className="sub-profile-wrapper">
            <span id="nickName">{user.nickName}</span>
            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {user.Location.dong}</span>
            {isOwner && <div className="edit-btn-wrapper" onClick={onEditClick}><span className="edit-btn">프로필 수정</span></div>}
        </div>
    );
}

export default PersonalInfo;