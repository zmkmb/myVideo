import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';

class CenterPage extends React.Component {

    constructor() {
        super()
        this.state = {
            headImg: { uri: '' }
        }
    }

    async logout() {
        let authtoken = await myStorage.set('authtoken', '');
        this.props.navigation.navigate('login');
    }

    login() {
        this.props.navigation.navigate('login');
    }

    headRight() {
        console.log(this.props)
        if (this.props.user.id) {
            return (<View style={styles.headRight}>
                <Text style={styles.name}>{this.props.user.mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <TouchableWithoutFeedback style={{ width: "100%" }} onPress={() => {
                        this.props.navigation.navigate('userInfo')
                    }}>
                        <Text style={styles.edit}>查看并编辑个人资料</Text>
                    </TouchableWithoutFeedback>
                    <Icon name="edit" style={{ marginLeft: 4, marginTop: 6 }}></Icon>
                </View>
            </View>)
        }
        return (<View style={styles.headRight}>
            <Text style={{ color: '#333', fontSize: 18 }} onPress={() => { this.login() }}>立即登录</Text>
            <Text style={styles.edit}>登录后查看更多信息</Text>
        </View>)
    }

    renderImage(){
        if(this.props.user.avatar){
            return <Image  source={{uri:this.props.user.avatar}} style={{ width: 80, height: 80, borderRadius: 40 }} />
        }else{
            return <Image  source={require(`../../static/img/headImg.jpeg`)} style={{ width: 80, height: 80, borderRadius: 40 }} />
        }
        
    }


    render() {
        return (<View style={styles.page}>
            <ImageBackground source={require(`../../static/img/bg.jpg`)} opacity={0.8} style={{ width: '100%', height: 180 }}>
                <View style={styles.head}>
                    <View style={styles.headLeft}>
                        {this.renderImage()}
                    </View>
                    {/* <View style={styles.headRight}>
                            <Text style={styles.name}>{this.props.user.mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}</Text>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <Text style={styles.edit}>查看并编辑个人资料</Text>
                                <Icon name="edit" style={{ marginLeft: 4, marginTop: 6 }}></Icon>
                            </View>
                        </View> */}
                    {this.headRight()}
                </View>
            </ImageBackground>
            <TouchableHighlight onPress={() => this.props.navigation.navigate('setting')} style={{
                height: 48,
                backgroundColor: "#fff",
                width: "100%"
            }}>
                <View style={styles.list}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon name="setting" style={{ color: "#999", fontSize: 16, marginRight: 8 }}></Icon>
                        <Text style={styles.listText}>设置</Text>
                    </View>
                    <Icon name="right" style={{ color: "#999" }}></Icon>
                </View>
            </TouchableHighlight>
            <View style={styles.line}></View>
            <TouchableHighlight style={{
                height: 48,
                backgroundColor: "#fff",
                width: "100%"
            }}>
                <View style={styles.list}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Icon name="staro" style={{ color: "#999", fontSize: 16, marginRight: 8 }}></Icon>
                        <Text style={styles.listText}>我的收藏</Text>
                    </View>
                    <Icon name="right" style={{ color: "#999" }}></Icon>
                </View>
            </TouchableHighlight>

        </View >)
    }

}

let styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
        height: "100%"
    },
    headLeft: {
        width: 80,
        height: 80,
        borderRadius: 80
    },
    name: {
        color: "#333",
        fontSize: 22
    },
    edit: {
        marginTop: 6,
        color: "#666",
        fontSize: 12
    },
    headRight: {
        padding: 10,
        marginLeft: 10,
        justifyContent: "center"
    },
    head: {
        width: "100%",
        height: 200,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
        alignItems: "center",
        paddingLeft: 18,
        paddingRight: 18
    },
    list: {
        height: 48,
        backgroundColor: "#fff",
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15
    },
    listText: {
        color: "#333",
        fontSize: 16
    },
    line: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#eee"
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterPage);