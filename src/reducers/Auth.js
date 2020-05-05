export const initialState  = {
    isLoading: true,
    isSignout: false,
    userToken: null,
    errMsg: null
  }    

export default (prevState = initialState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
          errMsg: null
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
        case 'AUTH_ERR':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            errMsg: action.errMsg
          };
    }
  }