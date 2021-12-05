import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../component/Header';
import EditProfile from '../component/Profile/EditProfile';
import ProfileBox from '../component/Profile/ProfileBox';
import '../styleSheets/profile.css';
const Profile = () => {
    const { user } = useSelector(state => ({
        user: state.profileInfo.profileObj,
        isOwner: state.profileInfo.isOwner
    }))
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        axios.get(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/user/${user.id}/posts`).then(res => {
            setPostList(res.data.posts)
        });
    }, [user])

    const [isEdit, setIsEdit] = useState(false);
    return (<div className="Container profile">
        <Header />
        <div className="centerContainer wrapper">
            <div className="centerContainer main-content">
                {!isEdit ?
                    <ProfileBox postList={postList} setIsEdit={setIsEdit} />
                    :
                    <EditProfile />
                }
            </div>
        </div>
    </div>);
}

export default Profile;