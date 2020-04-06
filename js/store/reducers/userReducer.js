 let userInitState = {
    userId:0,
    authtoken:'',
    avatar:require('../../../static/img/headImg.jpeg'),
    headImg:'',
    username:'',
    mobile:''
}
 
 const userReducer = (state=userInitState,action)=>{
    switch(action.type){
        case 'updateUserInfo':
            return {
                ...state,
                ...action.info
            }
        default:
            return state;
    }
}

export default userReducer;