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
import { connect } from 'react-redux';
import navUtils from '../navigation/NavigationUtils';
import VideoItem from '../component/VideoItem'
class CollectPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            refreshing: false,
            page: 1
        }
        navUtils.mainNavProps = this.props;
    }

    componentDidMount() {
        this.getData()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.id) {
            this.getData()
        }
    }


    getData() {
        this.setState({ refreshing: true });
        api.post('/video/collect', { page: this.state.page }).then((res) => {
            if (res.result) {
                this.setState({ list: res.data.list });
            }
            this.setState({ refreshing: false });
        }).catch((err) => {
            console.log(err)
        })
    }


    _onRefresh = () => {
        this.getData();
    }


    goDetail(video) {
        this.props.navigation.navigate('video', { video })
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
            <View style={{ height: 60, backgroundColor: '#fff', justifyContent: "flex-end" }}>
                <Text style={{ color: "#ff5959", fontSize: 20, marginLeft: 15 }}>关注</Text>
            </View>
            <View style={styles.item}>
                <View style={styles.listWraper}>
                    {this.state.list.map((item, index) => {
                        return (
                            <VideoItem
                                img={item.img}
                                name={item.name}
                                key={index}
                                onPress={() => {
                                    this.goDetail(item)
                                }}
                                style={{
                                    width: "48%"
                                }}
                            >
                            </VideoItem>
                        )
                    })}
                </View>
            </View>

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
        margin: 20,
        marginTop: 0,
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    listWraper: {
        flexDirection: "row",
        flexWrap: "wrap",

        justifyContent: "space-between"
    },
    list: {
        width: "48%",
        height: 200,
        marginTop: 0
    },
    listFooter: {
        display: "flex",
        marginTop: 8
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectPage);
