import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableHighlight,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import TopBar from '../component/TopBar';
import { login, upDataUserInfo } from '../store/action';
import api from '../api';

class EditeNamePage extends React.Component {

    constructor() {
        super()
        this.state = {
            username: ''
        }
    }

    async logOut() {
        let authtoken = await myStorage.set('authtoken', '');
        this.props.navigation.navigate('login');
    }

    save() {
        if (!this.state.username) {
            return
        }
        api.post('/user/updateName', { username: this.state.username }).then((res) => {
            if (res.result) {
                this.props.upDataUserInfo(res.data);
                this.props.navigation.goBack();
            }
        })
    }


    render() {
        return (<View style={styles.page}>
            <TopBar callBack={() => { this.props.navigation.goBack() }} title="更改名字"></TopBar>
            <View style={styles.input}>
                <TextInput
                    onChangeText={(text) => this.setState({ username: text })}
                    placeholder={this.props.user.username}
                    maxLength={10}
                    placeholderTextColor="#222"
                    style={{
                        borderBottomColor: "#aaa",
                        borderBottomWidth: 0.5,
                        paddingLeft: 10,
                        fontSize: 16
                    }}
                />
            </View>
            <TouchableHighlight onPress={() => { this.save() }} style={{ width: "100%" }} underlayColor="#ddd">
                <View style={styles.list}>
                    <Text style={styles.listText}>保存</Text>
                </View>
            </TouchableHighlight>
        </View>)
    }

}

let styles = StyleSheet.create({
    page: {
        display: "flex",
    },
    input: {
        width: "100%",
        marginBottom: 100
    },
    list: {
        height: 50,
        backgroundColor: "#fff",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    listText: {
        fontSize: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(EditeNamePage);