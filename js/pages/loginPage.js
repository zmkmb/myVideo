import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    ToastAndroid,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { login, updateUserInfo } from '../store/action';
import api from '../api';
import { Toast } from 'teaset';


class LoginPage extends React.Component {

    constructor(props) {
        super()
        this.state = {
            mobile: '',
            password: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.user)
        if (nextProps.user.loginStatus) {
            this.props.navigation.goBack();
        }
    }



    /* 登录 */
    login() {
        //this.props.login(this.state)
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

        api.post('/user/login', { mobile, password, code }).then((res) => {
            if (res.result) {
                Toast.message('登录成功');
                this.props.updateUserInfo(res.data);
                this.props.navigation.goBack();
            } else {
                Toast.message(res.error);
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    /* 注册 */
    register() {
        this.props.navigation.navigate('register');
    }


    render() {


        return (
            <View style={styles.page}>
                <View style={styles.head}>
                    {this.props.navigation.getParam('close')? <TouchableNativeFeedback onPress={() => { this.props.navigation.goBack() }}>
                        <Icon name={'left'} size={22} style={{ position: "absolute", left: 15 }}></Icon>
                    </TouchableNativeFeedback> : null}
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: "#33", fontSize: 22, }}>登录</Text>
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
                </View>
                <TouchableHighlight onPress={() => { this.login() }} style={styles.button} underlayColor="#ccc">
                    <Text style={{ color: '#fff', fontSize: 16 }}>登录</Text>
                </TouchableHighlight>
                {/* <View style={styles.button}>
                    <Button
                        style={{height:48}}
                        onPress={() => { this.register() }}
                        title="注册"
                        color="#54a2da"
                    />
                </View> */}
                <View style={{ width: "100%", alignItems: "flex-end", marginTop: 10 }}>
                    <Text style={{ color: "#ff5959", marginRight: 20 }} onPress={() => { this.register() }}>立即注册</Text>
                </View>
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
        updateUserInfo: (data) => {
            return dispatch(updateUserInfo(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

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
    form: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    button: {
        width: "90%",
        height: 48,
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "#ff5959"
    }
})
