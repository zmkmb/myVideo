import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    Dimensions
} from 'react-native';

import VideoPlayer from 'react-native-video-controls';

class MyVideo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ width: "100%",height:this.props.videoHeight}}>
                <VideoPlayer
                    {...this.props}
                />
            </View>
        )
    }

}

export default MyVideo;