import { useSelector } from 'react-redux';
import PostContainer from '../component/PostContainer';
import '../styleSheets/profile.css';
import PersonalInfo from "./PersonalInfo";
import ProfileImg from "./ProfileImg";
const ProfileBox = ({postList, setIsEdit}) => {
    const { user } = useSelector(state => ({user: state.profileInfo.profileObj}));
    return (
        <>
            <div className="centerContainer profile-wrapper">
                <ProfileImg profileUrl={user.profileUrl}/>
                <PersonalInfo setIsEdit={setIsEdit}/>
            </div>
            <span>{user.nickName}님이 작성한 글</span>
            <hr />
            {postList.map(post => <PostContainer userObj={user} postObj={post} />)}
        </>
    );
}

export default ProfileBox;