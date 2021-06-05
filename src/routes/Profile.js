import REACT, { useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import DaumPost from '../component/DaumPost';
import MiniPostContainer from '../component/MiniPostContainer';
const Mypage = ({ userObj }) => {
    const [user, setUser] = useState(() => JSON.parse(window.localStorage.getItem("profileObj")) || 0);
    const [editUser, setEditUser] = useState(user);
    const [postList, setPostList] = useState(
        [{
            userId: { nickName: "닉네임", locationId: { dong: "상도동" } }
            , locationId: { dong: "상도동" },
            title: "같이 배드민턴 쳐요",
            content: "도화공원에서 같이 배드민턴 칠 사람 구해요 :-)",
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            tag: ["운동", "배드민턴"],
            heart: 12,
            comment: 10
        }, {
            userId: { nickName: "닉네임", }
            , locationId: { dong: "상도동" },
            title: "제목",
            content: "내용 어쩌구 저쩌구\nㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍddddddddddddddddddddddddddd",
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            tag: ["태그1", "태그2"],
            heart: 12,
            comment: 10
        }]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOwner, setIsOwner] = useState(userObj.nickName == JSON.parse(window.localStorage.getItem("profileObj")).nickName);
    const [address, setAddress] = useState(userObj.locationId.fullAddress);
    const [locationObj, setLocationObj] = useState(userObj.locationId);
    const [isEdit, setIsEdit] = useState(false);
    const onCheck = () => {
        //중복확인
    }
    const onPostClick = () => {
        setIsOpenModal(prev => !prev);
    }
    const history = useHistory();
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

        let reader = new FileReader();
        reader.onload = () => {
            setEditUser(editUser => ({ ...editUser, profileUrl: reader.result }));
        };
        reader.readAsDataURL(file);

    };
    const onSubmit = (event) => {
        event.preventDefault();
        try {
            //중복확인
            //주소확인
            setUser(editUser);
            setIsEdit(false);
            setIsOpenModal(false);
        } catch (error) {

        }
    }
    useEffect(() => {
        if (locationObj != null) {
            setEditUser(editUser => ({ ...editUser, locationId: locationObj }));
        }
        //postArr검색
    }, [locationObj])
    return (<div className="Container myPage">
        <header><img src="logo2.png" width="60px" onClick={onClickLogo} /></header>
        <div className="centerContainer wrapper">
            <div className="centerContainer main-content">
                {isEdit ?
                    <div className="my-profile-wrapper my-profile-edit-wrapper">
                        <form className="centerContainer" onSubmit={onSubmit}>
                            <div className="centerContainer my-profile-edit-wrapper2">
                                <div className="centerContainer profile-img-wrapper">
                                    <div className="profile-img"><img src={editUser.profileUrl ? editUser.profileUrl : "logo.png"} /></div>
                                    <label for="profile-img-upload" id="edit-profile-img-btn">프로필 사진 수정</label>
                                    <input type="file" onChange={onFileChange} id="profile-img-upload" style={{ display: "none" }} />
                                </div>
                                <div className="sub-profile-wrapper">
                                    <div className="nickname-wrapper">
                                        <input type="text" name="nickName" value={editUser.nickName} placeholder="닉네임" onChange={onChange} />
                                        <span onClick={onCheck} id="check-btn">중복확인</span>
                                    </div>
                                    {isOpenModal && <DaumPost setAddress={setAddress} setLocationObj={setLocationObj} />}
                                    <div className="address-form-wrapper">

                                        <div className="address-detail">
                                            {locationObj && <span id="dong"> <><FontAwesomeIcon icon={faMapMarkerAlt} /> {locationObj.dong}</></span>}
                                            <span onClick={onPostClick} id="address-search-btn">{address ? "주소 재검색" : "주소 검색"}</span>
                                        </div>
                                        <span id="address">{address ? address : "동네를 설정해주세요."}</span>

                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="완료" />
                        </form>
                    </div>
                    : <div className="centerContainer my-profile-wrapper">
                        <div className="profile-img-wrapper">
                            <div className="profile-img"><img src={user.profileUrl ? user.profileUrl : "logo.png"} /></div>
                        </div>

                        <div className="sub-profile-wrapper">
                            <span id="nickName">{user.nickName}</span>
                            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {user.locationId.dong}</span>
                            {isOwner && <div className="edit-btn-wrapper" onClick={onEditClick}><span className="edit-btn">프로필 수정</span></div>}

                        </div>
                    </div>}
                <span>{user.nickName}님이 작성한 글</span>
                <hr />
                {postList.map(post => <MiniPostContainer postObj={post} />)}
            </div>
        </div>
    </div>);
}

export default Mypage;