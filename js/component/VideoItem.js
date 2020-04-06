import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    ScrollView,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Card } from 'react-native-shadow-cards';

class VideoItem extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        return (
            <TouchableHighlight underlayColor="#fff" onPress={() => { this.props.onPress() }} style={{
                width: "48%",
                height: 200,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 10,
                ...this.props.style
            }}>
                <Card style={{ width: "100%", height: 200,...this.props.CardStyle}} cornerRadius={10}>
                    <Image style={{ height: 140, width: "100%", borderTopLeftRadius: 10, borderTopRightRadius: 10,...this.props.imgStyle }} source={{ uri: this.props.img }} />
                    <View style={{padding:8}}>
                        <Text style={{ fontSize: 14, color: "#333" }}>{this.props.name}</Text>
                    </View>
                </Card>
            </TouchableHighlight>
        )
    }

}

export default VideoItem;