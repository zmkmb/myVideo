/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    Dimensions,
    Animated,
    StatusBar,
    TextInput,
    Image,
    FlatList,
    TouchableHighlight,
    RefreshControl,
    TouchableWithoutFeedback
} from 'react-native';

import ShareUtile from '../ShareUtil';
import MyVideo from '../component/MyVideo'
import { connect } from 'react-redux';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/AntDesign';
import api from '../api';
import utils from '../utils';
class VideoPage extends React.Component {
    constructor(props) {
        super(props)
        let { height, width } = Dimensions.get('window');
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            videoUrl: "",
            img: '',
            height,
            width,
            videoHeight: 300,
            scrollAnim: new Animated.Value(0),
            name: '',
            video: {},
            commentContent: '',
            commentList: [],
            page: 1,
            isFullscreen: false,
            disableBack: false,
            resizeMode: 'contain',
            refreshing: false,
            icons: { like1: false, dislike1: false, star: false, sharealt: false }
        };

    }

    componentDidMount() {
        let video = this.props.navigation.getParam('video');
        this.setState({ video: video });
        video && this.setState({ img: video.img, name: video.name });
        this.getComment(video.id);
        this.getVideoStatus(video.id);
    }

    //全屏
    enterFullScreen() {
        let videoHeight = this.state.width;
        console.log(videoHeight)
        this.setState({ videoHeight: videoHeight, disableBack: true });
        Orientation.lockToLandscape();
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
    }

    //退出全屏
    exitFullscreen() {
        this.setState({ videoHeight: 300, disableBack: false })
        Orientation.lockToPortrait();
    }

    //发送评论
    sendCommment() {
        if (!this.state.commentContent) {
            return;
        }

        if (this.state.commentContent.length > 50) {
            return;
        }

        api.post('/video/addComment', { video_id: this.state.video.id, comment: this.state.commentContent }).then((res) => {
            if (res.result) {
                this.refs.textInput.clear();
                this.state.page = 1;
                this.getComment();
            }
        })
    }

    //获取评论
    getComment(video_id) {
        video_id = this.state.video.id ? this.state.video.id : video_id;
        api.post('/video/getComment', { video_id: video_id, page: this.state.page }).then((res) => {
            if (res.result && res.data.list.length) {
                if (this.state.page == 1) {
                    this.state.commentList = [];
                }
                this.setState({ commentList: this.state.commentList.concat(res.data.list) });
                this.state.page++;
                this.setState({ refreshing: false });
            }

        })
    }

    //获取视频信息
    getVideoStatus(video_id) {
        api.post('/video/videoStatus', { video_id: video_id }).then((res) => {
            console.log(res)
            //icons: { like1: false, dislike1: false, star: false, sharealt: false }
            let icons = { like1: false, dislike1: false, star: false, sharealt: false }
            if (res.data.like) {
                icons.like1 = true;
            }
            if (res.data.dislike) {
                icons.dislike1 = true;
            }
            if (res.data.star) {
                icons.star = true;
            }
            if (res.data.share) {
                icons.sharealt = true;
            }
            this.setState({ icons: icons })
        })
    }

    //分享
    share() {
        // ShareUtile.share('111',this.state.video.img,'','222',0,(code,message) =>{
        //     this.setState({result:message});
        // });
    }

    changeIconStatus(icon) {
        let status = {}
        let icons = this.state.icons;
        icons[icon] = !icons[icon];

        for (let item in icons) {
            if (item == 'like1') {
                status.like = icons['like1'] ? 1 : 0;
            }

            if (item == 'dislike1') {
                status.dislike = icons['dislike1'] ? 1 : 0;
            }

            if (item == 'star') {
                status.star = icons['star'] ? 1 : 0;
            }

            if (item == 'sharealt') {
                status.share = icons['sharealt'] ? 1 : 0;
                this.share();
            }
        }

        api.post('/video/update', { ...status, video_id: this.state.video.id }).then((res) => {
            if(res.result){
                this.setState({ icons: icons })
            }
        })

       
    }

    tabScroll(type) {
        let x;
        if (type == 1) {
            x = 0
        } else {
            x = this.state.width
        }

        this.myScrollView.scrollTo({ x: x, y: 0, animated: true });
        Animated.timing(
            this.state.scrollAnim,
            {
                toValue: x / 2,
                duration: 500
            }
        ).start();
    }

    back() {
        let { width, height } = Dimensions.get('window');
        if (width > height) {
            Orientation.lockToPortrait();
            this.setState({ videoHeight: 300 })
        } else {
            this.props.navigation.goBack();
        }
    }

    play() {
        if (!this.state.videoUrl) {
            this.setState({ videoUrl: this.state.video.m3u8_url.match(/.*(http.*)/)[1] });
        }
    }

    load() {
        this.setState({ paused: false });
    }

    _onRefresh = () => {
        this.getComment(this.state.video.id);
    }


    scrollBegin(e) {
        this.scrollBeginTime = e.timeStamp
    }

    scrollEnd(e) {

        let x = e.nativeEvent.contentOffset.x;
        if (e.timeStamp - this.scrollBeginTime < 200) {
            if (50 < x && x < this.state.width / 2) {
                x = this.state.width
            } else if (this.state.width / 2 < x && x < this.state.width - 50) {
                x = 0
            } else {
                x = 0
            }
        } else {
            if (x > this.state.width / 2) {
                x = this.state.width
            } else {
                x = 0
            }
        }

        this.myScrollView.scrollTo({ x: x, y: 0, animated: true });
        Animated.timing(
            this.state.scrollAnim,
            {
                toValue: x / 2,
                duration: 500
            }
        ).start();
    }

    comment() {

        if (this.state.commentList.length) {
            return <FlatList
                style={{ backgroundColor: "#fff" }}
                data={this.state.commentList}
                onEndReached={() => { this.getComment() }}
                renderItem={({ item, index }) => <View style={{ minHeight: 80, flexDirection: "row", marginRight: 15 }} key={index}>
                    <View style={{ flex: 1, padding: 10,marginLeft:5 }}>
                        <View style={{ height: 40, width: 40, borderRadius: 40, backgroundColor: "#ccc" }}>
                            <Image source={{ uri: appConfig.host + item.avatar }} style={{ height: 40, width: 40, borderRadius: 40, backgroundColor: "#ccc" }} />
                        </View>
                    </View>
                    <View style={{ flex: 8, borderBottomColor: "#ccc", borderBottomWidth: 0.5 }}>
                        <Text style={{ marginTop: 6, fontSize: 12, color: "#aaa" }}>{item.username}</Text>
                        <Text style={{ marginTop: 8 }}>{item.comment}</Text>
                        <Text style={{ marginTop: 6, marginBottom: 8, fontSize: 12, color: "#aaa" }}>{utils.formatDate(item.create_time)}</Text>
                    </View>

                </View>}
            />

        }
        return <View style={{ backgroundColor: "#fff", height: "100%",justifyContent:"center",alignItems:"center" }}>
            <Text style={{ padding: 10 }}>暂无评论</Text>
        </View>
    }

    render() {
        return (
            <View style={styles.page}>
                <StatusBar backgroundColor="#ff0000"
                    translucent={true}
                    hidden={true}
                    animated={true} />

                <MyVideo
                    ref="myVideo"
                    source={{ uri: this.state.videoUrl }}
                    videoHeight={this.state.videoHeight}
                    style={{ width: "100%", height: this.state.videoHeight }}
                    showOnStart={true}
                    paused={this.state.paused}
                    onEnterFullscreen={() => this.enterFullScreen()}
                    onExitFullscreen={() => this.exitFullscreen()}
                    onBack={() => { this.back() }}
                    disableVolume={true}
                    isFullScreen={this.state.isFullscreen}
                    disableBack={this.state.disableBack}
                    onPlay={() => { this.play() }}
                    onLoad={() => { this.load() }}
                    //resizeMode={this.state.resizeMode}
                    // disableFullscreen={true}
                    videoStyle={styles.fullScreen}
                />

                <View style={{ ...styles.content, flex: 1 }}>
                    <View style={styles.header}>
                        <View style={styles.tab}>
                            <Text onPress={() => {
                                this.tabScroll(1)
                            }}>简介</Text>
                        </View>
                        <View style={styles.tab}>
                            <Text onPress={() => {
                                this.tabScroll(2)
                            }}>评论</Text>
                        </View>
                        <Animated.View style={{ height: 2, backgroundColor: "#ff5959", width: "50%", position: "absolute", bottom: 0, left: this.state.scrollAnim }}></Animated.View>
                    </View>

                    <ScrollView
                        style={styles.contentContainer}
                        onScrollEndDrag={
                            (e) => {
                                this.scrollEnd(e)
                            }}
                        onScrollBeginDrag={
                            (e) => {
                                this.scrollBegin(e)
                            }
                        }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ref={(view) => { this.myScrollView = view; }}
                        alwaysBounceVertical={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        <View style={{ ...styles.item, width: this.state.width }}>
                            <View style={styles.iconList}>
                                {Object.keys(this.state.icons).map((item, index) => {
                                    return <Icon name={item} size={20} color={this.state.icons[item] ? "#ff5959" : "#ccc"} onPress={() => { this.changeIconStatus(item) }}></Icon>
                                })}
                            </View>
                            <View style={styles.videoInfo}>
                                <Text>{this.state.name}</Text>
                            </View>
                        </View>
                        <View style={{ ...styles.item, width: this.state.width }}>
                            {/* 评论 */}
                            {this.comment()}
                            <View style={styles.footInput}>
                                <TextInput
                                    ref='textInput'
                                    placeholder={'说点什么吧'}
                                    onChangeText={(text) => this.setState({ commentContent: text })}
                                    style={{ marginLeft: 10, flex: 5, backgroundColor: "#eee", height: 40, borderRadius: 20, paddingLeft: 10 }}
                                />
                                <TouchableHighlight onPress={() => { this.sendCommment() }} style={{ display: "flex", flex: 1, color: "#666", justifyContent: "center", alignItems: "center", height: "100%" }} underlayColor="#ddd">
                                    <Text style={{ color: "#666" }}>发布</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </ScrollView>
                </View>

            </View >
        );
    }
}
const styles = StyleSheet.create({
    page: {
        height: "100%"
    },
    fullScreen: {
        width: "100%",
        backgroundColor: "#000"
    },
    content: {
        backgroundColor: "#fff"
    },
    header: {
        display: "flex",
        height: 46,
        backgroundColor: "#fff",
        flexDirection: "row",
        elevation: 3,
        shadowOffset: { width: 0, height: 0 }
    },
    tab: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentContainer: {
        width: "100%",
        height: 100,
        display: "flex",
        backgroundColor: "#ccc"
    },
    videoInfo: {
        backgroundColor: "#fff",
        height: "100%",
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ccc"
    },
    commment: {
        backgroundColor: "#fff",
        height: "100%",
        padding: 10,
        marginBottom: 30
    },
    iconList: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 46,
        backgroundColor: "#fff",
    },
    footInput: {
        position: "absolute",
        height: 50,
        bottom: 0,
        width: "100%",
        left: 0,
        backgroundColor: "#fff",
        flexDirection: "row",
        borderColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 0.5,
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch({ 'type': 'login' });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPage);
