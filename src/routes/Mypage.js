import REACT, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faHeart, faComment, faCaretDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import MyPostContainer from '../component/MyPostContainer';
import DaumPost from '../component/DaumPost';
const Mypage = () => {
    const [user, setUser] = useState({
        userId: "",
        locationId: "상도동",
        email: "",
        nickName: "runru",
        profileUrl: ""
    });
    const [editUser, setEditUser] = useState(user);
    const [postList, setPostList] = useState([{
        uNickName: "닉네임"
        , uLocation: "상도4동",
        title: "같이 배드민턴 쳐요",
        content: "도화공원에서 같이 배드민턴 칠 사람 구해요 :-)",
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        tag: ["운동", "배드민턴"],
        heart: 12,
        comment: 10
    }, {
        uNickName: "닉네임"
        , uLocation: "상도4동",
        title: "제목",
        content: "내용 어쩌구 저쩌구\nㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍddddddddddddddddddddddddddd",
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        tag: ["태그1", "태그2"],
        heart: 12,
        comment: 10
    }]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [address, setAddress] = useState("");
    const [addressObj, setAddressObj] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [profileImg, setProfileImg]=useState("");
    const onCheck = () => {
        //중복확인
    }
    const onPostClick = () => {
        setIsOpenModal(prev => !prev);
    }
    const history = useHistory();
    const onClickLogo = () => {
        history.push("/main");
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
                setEditUser(editUser=>({...editUser,profileUrl:reader.result}));
            };
            reader.readAsDataURL(file);
        
    };
    const onSubmit=(event)=>{
        event.preventDefault();
        try{
            //중복확인
            //주소확인
            setUser(editUser);
            setIsEdit(false);
            setIsOpenModal(false);
        }catch(error){

        }
    }
    useEffect(() => {
        if(addressObj!=null){
            setEditUser(editUser=>({...editUser,locationId:  addressObj.address.region_3depth_name}));
        }
        //postArr검색
    }, [addressObj])
    return (<div className="Container myPage">
        <header><img src="logo2.png" width="60px" onClick={onClickLogo} /></header>
        <div className="centerContainer wrapper">
            <div className="centerContainer main-content">
                {isEdit ?
                    <div className="my-profile-wrapper my-profile-edit-wrapper">
                        <form className="centerContainer" onSubmit={onSubmit}>
                            <div className="centerContainer my-profile-edit-wrapper2">
                                <div className="centerContainer profile-img-wrapper">
                                    <div className="profile-img"><img src={editUser.profileUrl?editUser.profileUrl:"logo.png"} /></div>
                                    <label for="profile-img-upload" id="edit-profile-img-btn">프로필 사진 수정</label>
                                    <input type="file" onChange={onFileChange} id="profile-img-upload" style={{display:"none"}}/>
                                </div>
                                <div className="sub-profile-wrapper">
                                    <div className="nickname-wrapper">
                                        <input type="text" name="nickName" value={editUser.nickName} placeholder="닉네임" onChange={onChange} />
                                        <span onClick={onCheck} id="check-btn">중복확인</span>
                                    </div>
                                    {isOpenModal && <DaumPost setAddress={setAddress} setAddressObj={setAddressObj} />}
                                    <div className="address-form-wrapper">
                                        <span onClick={onPostClick} id="address-search-btn">주소 검색</span>
                                        <div className="address-detail">
                                            <span>{addressObj ? addressObj.address.region_1depth_name : "시/도"}</span>
                                            <span>{addressObj ? addressObj.address.region_2depth_name : "구/군"}</span>
                                            <span>{addressObj ? addressObj.address.region_3depth_name : "동/읍"}</span>
                                        </div>
                                        <span id="address">{address}</span>
                                    </div>


                                </div>
                            </div>

                            <input type="submit" value="완료" />
                        </form>


                    </div>
                    : <div className="centerContainer my-profile-wrapper">
                        <div className="profile-img-wrapper">
                        <div className="profile-img"><img src={user.profileUrl?user.profileUrl: "logo.png" } /></div>
                        </div>
                        
                        <div className="sub-profile-wrapper">
                            <span id="nickName">{user.nickName}</span>
                            <span id="profile-location"><FontAwesomeIcon icon={faMapMarkerAlt} /> {user.locationId}</span>
                            <div className="edit-btn-wrapper" onClick={onEditClick}><span className="edit-btn">프로필 수정</span></div>
                
                        </div>
                    </div>}


                <span>{user.nickName}님이 작성한 글</span>
                <hr />
                {postList.map(post => <MyPostContainer postObj={post} />)}
            </div>
        </div>


    </div>);
}

export default Mypage;