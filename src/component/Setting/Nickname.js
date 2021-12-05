import axios from 'axios';
import '../styleSheets/setting.css';
const NickName = ({ nickError, setNickError, setErrorMess, nickName, checkNick, setCheckNick, setNickName }) => {
    const onChange = (event) => {
        const { target: { value } } = event;
        setNickName(value);
    }
    const onCheck = () => {
        setErrorMess("");
        let valNick = /^[가-힣a-z0-9]{2,20}$/g;
        if (!valNick.test(nickName)) {
            setCheckNick(false);
            setNickError('- 2자 이상 20자 이하의 영문 소문자/한글(숫자혼합 가능)\n- 공백 및 특수문자 불가')
        }
        else {
            //DB중복확인
            axios.get(`http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/user/nickname/${nickName}`).then(res => {
                setCheckNick(!res.data.isExisted)
                !res.data.isExisted ?
                    setNickError("사용가능한 닉네임입니다.")
                    :
                    setNickError("이미 사용중인 닉네임입니다.")
            });
        }
    }
    return (
        <div className="sub-wrapper">
            <span>닉네임</span>
            <div className="nickname-wrapper">
                <input type="text" required value={nickName} onChange={onChange} placeholder="최소 2자 이상" />
                <span onClick={onCheck} id="check-btn">중복확인</span>
            </div>
            {checkNick ? <span id="nick-error" style={{ color: '#00aa7d' }}>{nickError}</span> :
                <span id="nick-error">{nickError.split("\n").map(it => <>{it}<br /></>)}</span>}
        </div>)
}

export default NickName;