import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import DaumPost from '../component/DaumPost';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../modules/user';
import { setProfileInfo } from '../modules/profileInfo';
import './profile.css'
import PostContainer from '../component/PostContainer';
import axios from 'axios';
const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user, isOwner } = useSelector(state => ({
        user: state.profileInfo.profileObj,
        isOwner: state.profileInfo.isOwner
    }))
    const [editUser, setEditUser] = useState(user);
    const [postList, setPostList] = useState([]);
    const [isOpenDaum, setIsOpenDaum] = useState(false);
    const [locationObj, setLocationObj] = useState(user.Location);
    const [isEdit, setIsEdit] = useState(false);
    const [nickError, setNickError] = useState("");
    const [checkNick, setCheckNick] = useState(false);
    const [profileImage, setProfileImage]=useState(null);
    useEffect(() => {
        axios.get(`/user/${user.id}/posts`).then(res => {
            setPostList(res.data.posts)
        });
    }, [])
    useEffect(() => {
            setEditUser(editUser => ({ ...editUser, Location: locationObj }));
    }, [locationObj])  
    
    const onCheck = () => {
        let valNick = /^[가-힣a-z0-9]{2,20}$/g;
        if (!valNick.test(editUser.nickName)) {
            setCheckNick(false);
            setNickError('- 2자 이상 20자 이하의 영문 소문자/한글(숫자혼합 가능)\n- 공백 및 특수문자 불가')
        }
        else if (user.nickName == editUser.nickName) {
            setCheckNick(true);
            setNickError("사용가능한 닉네임입니다.");
        }
        else {
            //DB중복확인
            axios.get(`/user/nickname/${editUser.nickName}`).then(res => {
                setCheckNick(!res.data.isExisted)
                !res.data.isExisted?
                setNickError("사용가능한 닉네임입니다.")
                :
                setNickError("이미 사용중인 닉네임입니다.")
            });
        }
    }
    const onClickLocation = () => {
        setIsOpenDaum(prev => !prev);
    }
    const onClickLogo = () => {
        history.push("/");
    }
    const onEditClick = () => {
        setIsEdit(true);
    }
    const onChange = (event) => {
        const { target: { value, name } } = event;
        setEditUser(editUser => ({ ...editUser, [name]: value }))
    }
    const onFileChange = (event) => {
        const { target: { files } } = event;
        let file;
        file = files[0];
        setProfileImage(files[0]);
        let reader = new FileReader();
        reader.onload = () => {
            setEditUser(editUser => ({ ...editUser, profileUrl: reader.result }));
        };
        reader.readAsDataURL(file);

    };
    const onSubmit = (event) => {
        event.preventDefault();
        try {
            if (JSON.stringify(user) === JSON.stringify(editUser)) {
                setIsEdit(false);
            }
            else {
                if (user.nickName!=editUser.nickName&&!checkNick) throw new Error('중복확인을 해주세요.');
                
                if(profileImage){
                    const formData = new FormData();
                    formData.append('profileImage', profileImage)
                    
                    axios.patch(`/user/profile/${user.id}`, formData).then(res => {
                        res.status==200&&
                            axios.patch(`/user/${user.id}`, { nickName: editUser.nickName, location: JSON.stringify(locationObj) }).then(res => {
                                //res profile변경 예정
                                //dispatch(setUserInfo({ ...user, nickName: editUser.nickName, Location: locationObj }))
                                axios.get(`/user/${user.id}/posts`).then(res => {
                                    setPostList(res.data.posts)
                                });
                            }) 
                    }) 
                }
                else{
                    axios.patch(`/user/${user.id}`, { nickName: editUser.nickName, location: JSON.stringify(locationObj) }).then(res => {
                        //dispatch(setUserInfo({ ...user, nickName: editUser.nickName, Location: locationObj }))
                        axios.get(`/user/${user.id}/posts`).then(res => {
                            setPostList(res.data.posts)
                        });
                    }) 
                }
                dispatch(setUserInfo(editUser));
                dispatch(setProfileInfo(editUser, true));
                setIsEdit(false);
                setIsOpenDaum(false);
                setNickError("");
                
            }
        } catch (error) {
            if (!checkNick) setNickError(error.message);
        }
    }

    return (<div className="Container profile">
        <header><img src="logo2.png" width="60px" onClick={onClickLogo} /></header>
        <div className="centerContainer wrapper">
            <div className="centerContainer main-content">
                {isEdit ?
                    <div className=" centerContainer profile-edit-wrapper">
                        <form className="centerContainer" onSubmit={onSubmit}>
                            <div className="centerContainer profile-edit-wrapper2">
                                <div className="centerContainer profile-img-wrapper">
                                    <div className="profile-img"><img src={editUser.profileUrl ? editUser.profileUrl : "profile_img.png"} /></div>
                                    <label for="profile-img-upload" id="edit-profile-img-btn">프로필 사진 수정</label>
                                    <input type="file" onChange={onFileChange} id="profile-img-upload" style={{ display: "none" }} />
                                </div>
                                <div className="centerContainer sub-profile-wrapper">
                                    <div className="row-container">
                                        <span className="label-span">닉네임</span>
                                        <div className="col-container">
                                            <div className="nickname-wrapper">
                                                <input type="text" name="nickName" required value={editUser.nickName} placeholder="닉네임" onChange={onChange} />
                                                <span onClick={onCheck} id="check-btn">중복확인</span>
                                            </div>
                                            {checkNick ?<span id="nick-error" style={{ color: '#00aa7d' }}>{nickError}</span>
                                                :<span id="nick-error">{nickError.split("\n").map(it => <>{it}<br /></>)}</span>}
                                        </div>
                                    </div>

                                    {isOpenDaum && <DaumPost setLocationObj={setLocationObj} />}
                                    <div className="row-container">
                                        <span className="label-span">나의 동네</span>
                                        <div className="address-form-wrapper">
                                            <div className="address-detail">
                                                {locationObj && <span id="dong"> <><FontAwesomeIcon icon={faMapMarkerAlt} /> {editUser.Location.dong}</></span>}
                                                <span onClick={onClickLocation} id="address-search-btn">{editUser.Location.detail ? "주소 재검색" : "주소 검색"}</span>
                                            </div>
                                            <span id="address">{editUser.Location.detail ? editUser.Location.detail : "동네를 설정해주세요."}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="완료" />
                        </form>
                    </div>
                    : <><div className="centerContainer profile-wrapper">
                        <div className="profile-img-wrapper">
                            <div className="profile-img"><img src={user.profileUrl ? user.profileUrl : "profile_img.png"} /></div>
                        </div>
                        <div className="sub-profile-wrapper">
                            <span id="nickName">{user.nickName}</span>
                            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {user.Location.dong}</span>
                            {isOwner && <div className="edit-btn-wrapper" onClick={onEditClick}><span className="edit-btn">프로필 수정</span></div>}
                        </div>
                    </div>
                        <span>{user.nickName}님이 작성한 글</span>
                        <hr />
                        {postList.map(post => <PostContainer userObj={user} postObj={post} />)}
                    </>}
            </div>
        </div>
    </div>);
}

export default Profile;