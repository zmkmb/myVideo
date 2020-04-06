import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableNativeFeedback,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { login, register } from '../store/action';
import api from '../api';
import { Toast } from 'teaset';



class Register extends React.Component {

    constructor(props) {
        super()
        this.state = {
            mobile: '',
            password: '',
            password1: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loginStatus) {
            this.props.navigation.goBack();
        }
    }



    /* 登录 */
    login() {
        this.props.login(this.state)
    }

    /* 注册 */
    register() {
        let mobile = this.state.mobile;
        let password = this.state.password;
        let password1 = this.state.password1;
        let code = '6666';
        if (!mobile) {
            return Toast.message('请输入手机号');
        }

        if (!(/^1[3456789]\d{9}$/.test(mobile))) {
            return Toast.message('手机号码有误');
        }

        if (!password) {
            return Toast.message('请输入密码');
        }

        if (password != password1) {
            return Toast.message('密码不一致');
        }

        api.post('/user/register', { mobile, password, code }).then((res) => {
            if (res.result) {
                Toast.message('注册成功');
                this.props.navigation.goBack();
            } else {
                ToastAndroid.show(res.error, ToastAndroid.SHORT);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {

        return (
            <View style={styles.page}>
                <View style={styles.head}>
                    <TouchableNativeFeedback onPress={()=>{this.props.navigation.goBack()}}>
                        <Icon name={'left'} size={22} style={{ position:"absolute",left: 15 }}></Icon>
                    </TouchableNativeFeedback>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#33", fontSize: 22, }}>注册</Text>
                    </View>
                </View>
                <View style={styles.form}>
                    <View style={{ display: "flex", flexDirection: "row", paddingLeft: 16, paddingRight: 16, width: "100%", backgroundColor: "#fff", marginTop: 20, height: 50, alignItems: "center", borderBottomWidth: 0.5, borderColor: "#ddd" }}>
                        <Icon name={'phone'} size={18}  ></Icon>
                        <TextInput
                            placeholder={'请输入手机号'}
                            onChangeText={(text) => this.setState({ mobile: text })}
                            style={{ flex: 1, marginLeft: 10 }}
                        />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", paddingLeft: 16, paddingRight: 16, width: "100%", backgroundColor: "#fff", marginTop: 20, height: 50, alignItems: "center", borderBottomWidth: 0.5, borderColor: "#ddd" }}>
                        <Icon name={'lock'} size={18}  ></Icon>
                        <TextInput
                            placeholder={'请输入密码'}
                            onChangeText={(text) => this.setState({ password: text })}
                            secureTextEntry={true}
                            style={{ flex: 1, marginLeft: 10 }}
                        />
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", paddingLeft: 16, paddingRight: 16, width: "100%", backgroundColor: "#fff", marginTop: 20, height: 50, alignItems: "center", borderBottomWidth: 0.5, borderColor: "#ddd" }}>
                        <Icon name={'lock'} size={18}  ></Icon>
                        <TextInput
                            placeholder={'请再次输入密码'}
                            onChangeText={(text) => this.setState({ password1: text })}
                            secureTextEntry={true}
                            style={{ flex: 1, marginLeft: 10 }}
                        />
                    </View>
                </View>
                <TouchableHighlight onPress={() => { this.register() }} style={styles.button} underlayColor="#ccc">
                    <Text style={{ color: '#fff', fontSize: 16 }}>注册</Text>
                </TouchableHighlight>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            return dispatch(login(data));
        },
        register: (data) => {
            return dispatch(register(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    head: {
        marginTop: 50,
        flexDirection: "row"
    },
    back: {
        position: "absolute",
        left: 0,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
    },
    form: {
        marginLeft: 20,
        marginRight: 20,
        marginTop:20
    },
    button: {
        width: "90%",
        height: 48,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "#ff5959"
    }
})
