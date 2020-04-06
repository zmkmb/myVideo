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
    Image,
    Animated,
    StatusBar
} from 'react-native';


class WelcomePage extends React.Component {
    constructor(props) {
        super();
        setTimeout(() => {
            this.props.navigation.navigate('main')
        }, 2000);
        //this.state = {fadeAnim : new Animated.Value(1)};
    }

    componentDidMount() {
        // Animated.timing(
        //     this.state.fadeAnim,
        //     {
        //         toValue:0,
        //         duration:3000
        //     }
        // ).start();
    }

    bg() {
        let list = [<Image source={require(`../../static/img/welcome0.jpg`)} style={styles.bg} />,
        <Image source={require(`../../static/img/welcome1.jpg`)} style={styles.bg} />,
        <Image source={require(`../../static/img/welcome2.jpg`)} style={styles.bg} />,
        <Image source={require(`../../static/img/welcome3.jpg`)} style={styles.bg} />]
        return list[Math.floor(Math.random()*4)];
    }

    render() {

        return (
            <View style={styles.page}>
                 <StatusBar backgroundColor="#ff0000"
                    translucent={true}
                    hidden={true}
                    animated={true} />
                {this.bg()}
            </View>

        );
    }

}

let styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    bg: {
        width: "100%",
        height: "100%"
    },
    logo: {
        width: 100,
        height: 100
    }
})


export default WelcomePage;
