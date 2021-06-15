
const SET_PROFILE_INFO = 'postInfo/SET_PROFILE_INFO'; // 로그인 정보 설정
const initialState = {
    profileObj: null,
    isOwner: false,
  };
export const setProfileInfo = (profileObj, isOwner) => {
    return {
        type: SET_PROFILE_INFO,
        profileObj,
        isOwner
    };
};

export default  function profileInfo(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE_INFO:
            return {...state,
                profileObj: action.profileObj,
                isOwner: action.isOwner
                };
        default:
            return state;
    }
};
