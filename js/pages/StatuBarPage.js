/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import {connect} from 'react-redux';
import InitNavigation from '../navigation/InitNavigation';

class StatusBarPage extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <View style={styles.page}>
                <StatusBar
                    // backgroundColor={this.props.statusBar.backgroundColor}
                    barStyle={this.props.statusBar.barStyle}
                    backgroundColor={"rgba(255,255,255,0)"}
                    translucent={true}
                />
                <InitNavigation />
            </View>
        );
    }

}

let styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%"
    }
})

const mapStateToProps = (state) => {
    return {
        statusBar: state.statusBar
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBarPage);

