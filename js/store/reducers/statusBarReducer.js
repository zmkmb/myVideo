let statusBarState = {
    backgroundColor:"#54a2da",
    barStyle:"dark-content"
}
 
 const statusBarReducer = (state=statusBarState,action)=>{
    switch(action.type){
        case 'setStatusBar':
            return {
                ...state,
                ...action.info
            }
        default:
            return state;
    }
}

export default statusBarReducer;