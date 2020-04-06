import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import _updateConfig from '../../update.json';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableHighlight,
    TextInput,
    Platform,
    Alert
} from 'react-native';

import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import TopBar from '../component/TopBar';
import { connect } from 'react-redux';

class SettingPage extends React.Component {

    constructor() {
        super()
        this.state = {
            host: '',
            newHost: ''
        }

    }

    async componentDidMount() {
        this.setState({ host: appConfig.host });
        this.setState({ newHost: appConfig.host });
    }

    async logOut() {
        let authtoken = await myStorage.set('authtoken', '');
        this.props.updateUserInfo();
        this.props.navigation.navigate('login');
    }


    async saveHost() {
        appConfig.host = this.state.newHost;
        console.log(appConfig)
        await myStorage.set('appConfig', appConfig);
    }

    async doUpdate(info) {
        try {
            const hash = await downloadUpdate(info);
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                { text: '是', onPress: () => { switchVersion(hash); } },
                { text: '否', },
                { text: '下次启动时', onPress: () => { switchVersionLater(hash); } },
            ]);
        } catch (err) {
            Alert.alert('提示', '更新失败.');
        }
    }

    async checkUpdate() {
        const { appKey } = _updateConfig[Platform.OS];
        try {
            info = await checkUpdate(appKey);
            console.log(info)
        } catch (err) {
            console.log(err);
        }

        if (info.expired) {
            Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                { text: '确定', onPress: () => { info.downloadUrl && Linking.openURL(info.downloadUrl) } },
            ]);
        } else if (info.upToDate) {
            Alert.alert('提示', '您的应用版本已是最新');
        } else {
            Alert.alert('提示', '检查到新的版本', [
                { text: '是', onPress: () => { this.doUpdate(info) } },
                { text: '否', },
            ]);
        }
    }

    render() {
        return (<View style={styles.page}>
            <TopBar callBack={() => { this.props.navigation.goBack() }} title="设置"></TopBar>
            <View style={{ height: 48, justifyContent: "center", alignItems: "flex-start", width: "100%", marginTop: 10 }}>
                <TextInput
                    placeholder={appConfig.host}
                    onChangeText={(text) => this.setState({ newHost: text })}
                    style={{ height: 48, paddingLeft: 10, width: "100%", backgroundColor: "#fff" }}
                />
            </View>
            <TouchableHighlight onPress={() => { this.saveHost() }} style={styles.btn} underlayColor="#ddd">
                <View>
                    <Text style={{ color: '#333', fontSize: 16 }}>切换服务器</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { this.checkUpdate() }} style={styles.btn} underlayColor="#ddd">
                <View>
                    <Text style={{ color: '#333', fontSize: 16 }}>检查更新</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => { this.logOut() }} style={styles.btn} underlayColor="#ddd">
                <Text style={{ color: '#333', fontSize: 16 }}>退出</Text>
            </TouchableHighlight>
        </View>)
    }

}

let styles = StyleSheet.create({
    page: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        height: 50,
        backgroundColor: "#fff",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    }
})


const mapStateToProps = (state) => {
    return {
        statusBar: state.statusBar,
        user:state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setStatusBar: (data) => {
            return dispatch({ type: "setStatusBar", info: {} })
        },
        updateUserInfo: (data) => {
            return dispatch({type:"updateUserInfo",info:{id:0}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
