import '../styleSheets/profile.css';
const EditProfileImg = ({profileUrl, setProfileImage}) => {
    return (
        <div className="centerContainer profile-img-wrapper">
            <div className="profile-img"><img src={profileUrl ? profileUrl : "img_p.png"} /></div>
            <label for="profile-img-upload" id="edit-profile-img-btn">프로필 사진 수정</label>
            <input type="file" onChange={setProfileImage} id="profile-img-upload" style={{ display: "none" }} />
        </div>
    );
}

export default EditProfileImg;