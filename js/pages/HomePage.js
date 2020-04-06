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
} from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import DemoPage from '../pages/DemoPage';
import AllPage from '../pages/AllPage';
import listPage from '../pages/ListPage';
import CatPage from '../pages/CatPage';
import VideoItem  from '../component/VideoItem';
const RouteConfigs = {
    tab1: {
        screen: AllPage,
        navigationOptions: {
            tabBarLabel: '推荐'
        }
    },
    tab2: {
        screen: CatPage,
        navigationOptions: {
            tabBarLabel: '科幻'
        }
    },
    tab3: {
        screen: CatPage,
        navigationOptions: {
            tabBarLabel: '动漫',
        }
    },
    tab4: {
        screen: CatPage,
        navigationOptions: {
            tabBarLabel: '喜剧'
        }
    }
}

const TabNavigatorConfig = {
    mode: 'modal',
    headerMode: 'none',
    lazy: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#fff',//TabBar 的背景颜色
            paddingTop: 20
        },
        indicatorStyle: { height: 1, backgroundColor: "#ff5959" },
        labelStyle: { fontSize: 16 },
        inactiveTintColor: '#333',
        activeTintColor: '#ff5959'
    }
}

const HomePage = createAppContainer(createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig));

// const HomePage = ()=> {
//   return (
//       <TopTab></TopTab>
//   );
// };


export default HomePage;
