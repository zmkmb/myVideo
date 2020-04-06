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
import navUtils from '../navigation/NavigationUtils';
import { connect } from 'react-redux';
import VideoItem from '../component/VideoItem'
class CatPage extends React.Component {

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

    goListPage() {
        this.props.navigation.navigate('list')
        console.log(3)
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
            {Object.keys(this.state.list).map((items, index) => {
                return (<View style={styles.item}>
                    <View style={styles.listWraper}>
                        {this.state.list[items].map((item, index) => {
                            return (
                            <VideoItem img={item.img} name={item.name} key={index} onPress={() => { this.goDetail(item) }}></VideoItem>)
                        })}

                    </View>
                </View>)
            })}
        </ScrollView>)
    }

}

let styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff"
    },
    line: {
        height: 0.5,
        width: "100%",
        backgroundColor: "#eee"
    },
    item: {
        display: "flex",
        marginRight: 15,
        marginLeft: 15,
        borderRadius: 10,
        paddingBottom: 10
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
        justifyContent: "space-between",
    },
    listFooter: {
        padding: 8
    },
    list: {
        width: "48%",
        height: 220,
        marginTop: 20,
        borderRadius: 10
    }
})

export default CatPage;