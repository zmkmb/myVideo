import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ScrollView,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class TopBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ width: "100%", backgroundColor: "#fff",flexDirection:"row",justifyContent:"center",alignItems:"center",paddingTop:20, height: 80, ...this.props.style }}>
                <TouchableHighlight onPress={()=>{this.props.callBack()}} style={{width:30,height:"100%",paddingLeft:10,justifyContent:"center"}} underlayColor="#fff">
                    <Icon name="left" style={{fontSize:16,color:"#333"}}>
                    </Icon>
                </TouchableHighlight>
                <Text style={{flex:1,color:"#333",fontSize:16}}>{this.props.title}</Text>
            </View>
        )
    }

}

export default TopBar;