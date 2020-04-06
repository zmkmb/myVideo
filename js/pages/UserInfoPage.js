import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import TopBar from '../component/TopBar';
import ImagePicker from 'react-native-image-picker';
import { login,upDataUserInfo } from '../store/action';
import api from '../api';
const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
class UserInfoPage extends React.Component {

    constructor() {
        super()
        this.state = {
            headImg:{uri:""}
        }
    }

    async logOut() {
        let authtoken = await myStorage.set('authtoken', '');
        this.props.navigation.navigate('login');
    }

    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }

            else {

                let source;

                if (Platform.OS === 'android') {
                    source = { uri: response.uri, isStatic: true }
                } else {
                    source = { uri: response.uri.replace('file://', ''), isStatic: true }
                }

                this.setState({ headImg: source })


                this.setState({
                    loading: true
                });

                let formData = new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
                //let file = {uri: response.uri, type: 'multipart/form-data', name: 'image.png'};   //这里的key(uri和type和name)不能改变,
                let file = {uri: response.uri, type: response.type, name:response.fileName};
           
                formData.append("files",file);
           
                api.post('/user/uploadHeadImg',formData,{upload:true}).then((res)=>{
                    if(res.result){
                        this.props.upDataUserInfo(res.data);
                    }
                })
            }
        });
    }

    render() {
        return (<View style={styles.page}>
            <TopBar callBack={()=>{this.props.navigation.goBack()}} title="个人信息"></TopBar>
            <TouchableHighlight onPress={() => { this.showImagePicker() }} style={{width:"100%",marginTop:10}} underlayColor="#ddd">
            <View style={{...styles.list,height:80}}>
                    <Text style={styles.listText}>头像</Text>
                    <Image source={this.props.user.avatar} style={{width:60,height:60,backgroundColor:"#ccc",marginRight:10,borderRadius:8}}/>
                    <Icon name="right" style={{color:"#999"}}></Icon>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { this.props.navigation.navigate('editName') }} style={{width:"100%"}} underlayColor="#ddd">
            <View style={styles.list}>
                    <Text style={styles.listText}>昵称</Text>
                    <Text style={{marginRight:10,color:"#999"}}>{this.props.user.username}</Text>
                    <Icon name="right" style={{color:"#999"}}></Icon>
                </View>
            </TouchableHighlight>
        </View>)
    }

}

let styles = StyleSheet.create({
    page: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    list:{
        height:60,
        backgroundColor:"#fff",
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        borderBottomColor:"#ccc",
        borderBottomWidth:0.5,
        paddingLeft:15,
        paddingRight:15
    },
    listText:{
        flex:1,
        fontSize:16
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        upDataUserInfo: (data) => {
            return dispatch(upDataUserInfo(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoPage);