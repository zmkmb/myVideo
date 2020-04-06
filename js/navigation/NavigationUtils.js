let navUtils = {
    mainNavProps:{},
    goBack(props){
        this.props.navagation.navigate.goBack();
    },
    goLogin(){
        if(this.mainNavProps){
            this.mainNavProps.navigation.navigate('login',{close:true});
        }
    }
}



export default navUtils;