import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styleSheets/profile.css';
const EditPersonalInfo = ({ checkNick, setCheckNick, nickError, setNickError, onChange, editUser }) => {
    const { user } = useSelector(state => ({
        user: state.profileInfo.profileObj,
        isOwner: state.profileInfo.isOwner
    }))
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
            axios.get(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/user/nickname/${editUser.nickName}`).then(res => {
                setCheckNick(!res.data.isExisted)
                !res.data.isExisted ?
                    setNickError("사용가능한 닉네임입니다.")
                    :
                    setNickError("이미 사용중인 닉네임입니다.")
            });
        }
    }

    return (
        <div className="row-container">
            <span className="label-span">닉네임</span>
            <div className="col-container">
                <div className="nickname-wrapper">
                    <input type="text" name="nickName" required value={editUser.nickName} placeholder="닉네임" onChange={onChange} />
                    <span onClick={onCheck} id="check-btn">중복확인</span>
                </div>
                {checkNick ?
                    <span id="nick-error" style={{ color: '#00aa7d' }}>{nickError}</span>
                    :
                    <span id="nick-error">{nickError.split("\n").map(it => <>{it}<br /></>)}</span>}
            </div>
        </div>
    );
}

export default EditPersonalInfo;