
const SET_POST_INFO = 'postInfo/SET_POST_INFO'; // 로그인 정보 설정
//const SET_SETTING = 'postInfo/SET_SETTING'; // validated 값 설정

const initialState = {
    postObj: null,
    isOwner: false,
  };
export const setPostInfo = (postObj, isOwner) => {
    return {
        type: SET_POST_INFO,
        postObj,
        isOwner
    };
};

export default  function postInfo(state = initialState, action) {
    switch (action.type) {
        case SET_POST_INFO:
            return {...state,
                postObj: action.postObj,
                isOwner: action.isOwner
                };
        default:
            return state;
    }
};
