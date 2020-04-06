import api from '../api';
import myStorage from "../storage";
export const login = (data)=>{

    return (dispatch)=>{
        console.log(data)
        api.post('/user/login',{body:data}).then((res)=>{
            console.log(res)
            dispatch(updateUserInfo({...res,loginStatus:true}))
        })
    }
}

export const register = (data)=>{
    return (dispatch)=>{
        api.post('/user/register',{body:data}).then((res)=>{
            console.log(res)
            //dispatch(updateUserInfo({...res,loginStatus:true}))
        })
    }
}

export const  updateUserInfo = (info)=>{
    myStorage.set('user', info);
    if(typeof(info.avatar) == 'string'){
        info.avatar = {uri:info.avatar};
    }
    return {
        type:'updateUserInfo',
        info
    }
}