
const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO'; // 로그인 정보 설정
const SET_SETTING = 'user/SET_SETTING'; // validated 값 설정
const SET_USER_INFO = 'user/SET_USER_INFO'; // 로그아웃


//export const logout = createAction(LOGOUT, AuthAPI.logout);
//export const checkStatus = createAction(CHECK_STATUS, AuthAPI.checkStatus);
const initialState = {
    userObj: {
        userId: 1,
        //profileUrl:"test_profile.jpg",
        nickName: "김지현",
        locationId: { dong: "상도동", fullAddress: "서울 동작구 성대로21길 36 (상도동, 우주빌B)" }
      },
    isLoggedin: false,
    isSetting:false,
  };
export const setLoggedInfo = (userObj, isLoggedin) => {
    return {
        type: SET_LOGGED_INFO,
        userObj,
        isLoggedin
    };
};

export const setSetting = isSetting => {
    return {
        type: SET_SETTING,
        isSetting
    };
};
export const setUserInfo= userObj => {
    return {
        type: SET_USER_INFO,
        userObj
    };
};
export default  function user(state = initialState, action) {
    switch (action.type) {
        case SET_LOGGED_INFO:
            return {...state,
                userObj: action.userObj,
                isLoggedin: action.isLoggedin
                };
        case SET_SETTING:
            return { ...state,isSetting: action.isSetting  };
        case SET_USER_INFO:
            return { ...state,userObj: action.userObj  };
        default:
            return state;
    }
};
