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

class FindPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            refreshing: false
        }
        navUtils.mainNavProps = this.props;
        //navUtils.goLogin()
        //this.props.navigation.navigate('login')
    }

    componentDidMount() {
        api.get('/video/list').then((res) => {
            if (res.result) {
                this.setState({ list: res.data.list });
            }
        }).catch((err) => {

        })
    }


    _onRefresh = () => {
        this.setState({ refreshing: true });
        api.get('/video/list').then((res) => {
            if (res.result) {
                this.setState({ list: res.data.list });
            }
            this.setState({ refreshing: false });
        }).catch((err) => {
            console.log(err)
        })
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
            {Object.keys(this.state.list).map((items, index) => {
                return (<View style={styles.item}>
                    <View style={styles.title}>
                        <Text>{items}</Text>

                    </View>
                    <View style={styles.listWraper}>
                        {this.state.list[items].map((item) => {
                            return (
                                <TouchableHighlight underlayColor="#fff" onPress={() => { this.goDetail(item) }} style={styles.list} key={index}>
                                    <View>
                                        <Image style={{ height: 140, width: "100%", borderRadius: 10 }} source={{ uri: item.img }} />
                                        <View style={styles.listFooter}>
                                            <Text>{item.name}</Text>
                                            <Text style={{ fontSize: 12, color: "#bbb" }}>desc</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>)
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
        margin: 20,
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
        marginTop: 10
    },
    listFooter: {
        display: "flex"
    }
})



export default FindPage;