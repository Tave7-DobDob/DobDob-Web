import '../styleSheets/profile.css';
const ProfileImg = ({ profileUrl }) => {
    return (
        <div className="profile-img-wrapper">
            <div className="profile-img"><img src={profileUrl ? profileUrl : "img_p.png"} /></div>
        </div>
    );
}

export default ProfileImg;