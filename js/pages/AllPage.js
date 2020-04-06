import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableHighlight,
    RefreshControl
} from 'react-native';
import api from '../api';
import { Carousel } from 'teaset';
import navUtils from '../navigation/NavigationUtils';
import { connect } from 'react-redux';
import VideoItem from '../component/VideoItem'

class AllPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            hotList: [{}, {}],
            refreshing: false
        }
        navUtils.mainNavProps = this.props;
    }

    componentDidMount() {
        let key = this.props.navigation.state.key;
        this.getVideoList(key);
        this.getHotVideoList(key);
    }

    getVideoList(key) {
        return new Promise((resolve, reject) => {
            api.post('/video/list', { key }).then((res) => {
                if (res.result) {
                    this.setState({ list: res.data.list });
                    resolve();
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }

    getHotVideoList(key) {
        return new Promise((resolve, reject) => {
            api.post('/video/hotList', { key }).then((res) => {
                if (res.result) {
                    this.setState({ hotList: res.data.list });
                    resolve();
                }
            }).catch((err) => {
                reject(err)
            })
        })
    }


    _onRefresh = () => {
        let key = this.props.navigation.state.key;
        this.setState({ refreshing: true });
        this.getVideoList(key).then(() => {
            this.setState({ refreshing: false });
        });
        this.getHotVideoList(key);
    }


    goDetail(video) {
        this.props.navigation.navigate('video', { video })
    }

    goListPage(item) {
        let tabObj = {'科幻':'tab2','动漫':'tab3','喜剧':'tab4'}
        
        tabObj[item] && this.props.navigation.navigate(tabObj[item])

    }

    render() {
        return (<ScrollView style={styles.page}
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
            }
        >

            <View style={styles.item}>
                <Carousel style={{ height: 200, flex: 1, borderRadius: 10 }} control={true}>
                    {this.state.hotList.map((item, index) => {
                        return (
                            <TouchableHighlight style={{ height: 200, width: "100%", borderRadius: 10 }} onPress={() => { this.goDetail(item) }} key={index}>
                                <Image style={{ width: "100%", height: 200, borderRadius: 10 }} resizeMode='cover' source={{ uri: item.img }} />
                            </TouchableHighlight>
                        )
                    })}
                </Carousel>
            </View>
            {/* <View style={styles.line}></View> */}
            {Object.keys(this.state.list).map((items, index) => {
                return (<View style={styles.item}>
                    <View style={styles.title}>
                        <Text style={{ fontSize: 16, color: "#222" }}>{items}</Text>
                        <Text style={{ fontSize: 12, color: "#777" }} onPress={() => {
                            this.goListPage(items)
                        }}>查看更多</Text>
                    </View>
                    <View style={styles.listWraper}>
                        {this.state.list[items].map((item, index) => {
                            return (
                                <VideoItem
                                    img={item.img}
                                    name={item.name}
                                    key={index}
                                    onPress={() => {
                                        this.goDetail(item)
                                    }}
                                    style={{
                                        width: "30%",
                                        height: 160
                                    }}
                                    imgStyle={{
                                        height: 100
                                    }}
                                    CardStyle={{
                                        height:160
                                    }}
                                >
                                </VideoItem>
                            )
                        })}
                    </View>
                    <View style={styles.line}></View>
                </View>)

            })}
        </ScrollView>)
    }

}

let styles = StyleSheet.create({
    page: {
        width: "100%",
        backgroundColor: "#fff"
    },
    line: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#eee"
    },
    item: {
        display: "flex",
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
        borderRadius: 10
    },
    title: {
        display: "flex",
        flexDirection: "row",
        height: 20,
        justifyContent: "space-between"
    },
    listWraper: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
        justifyContent: "space-between",
    },
    list: {
        width: "30%",
        height: 200,
        marginTop: 10
    },
    listFooter: {
        display: "flex",
        marginTop: 8
    }
})

export default AllPage;