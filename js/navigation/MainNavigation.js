import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomePage from '../pages/HomePage';
import FindPage from '../pages/FindPage';
import CollectPage from '../pages/CollectPage';
import VideoPage from '../pages/VideoPage';
import LoginPage from '../pages/loginPage';
import UpdatePage from '../pages/UpdatePage';
import RegisterPage from '../pages/RegisterPage';
import CenterPage from '../pages/CenterPage';
import ListPage from '../pages/ListPage';
import loginPage from '../pages/loginPage';
import SettingPage from '../pages/SettingPage';
import UserInfoPage from '../pages/UserInfoPage';
import EditNamePage from '../pages/EditNamePage';


const RouteConfigs = {
    home: {
        screen: HomePage,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, tintColor }) => {
                const color = focused ? '#ff5959' : '#666';
                return (
                    <Icon name="home" size={20} color={color}></Icon>
                )
            }
        }
    },
    search: {
        screen: CollectPage,
        navigationOptions: {
            tabBarLabel: '关注',
            tabBarIcon: ({ focused, tintColor }) => {
                const color = focused ? '#ff5959' : '#666';
                return (
                    <Icon name="visibility" size={20} color={color}></Icon>
                )
            }
        }
    },
    hot: {
        screen: FindPage,
        navigationOptions: {
            tabBarLabel: '发现',
            tabBarIcon: ({ focused, tintColor }) => {
                const color = focused ? '#ff5959' : '#666';
                return (
                    <Icon name="filter-none" size={20} color={color}></Icon>
                )
            }
        }
    },
    center: {
        screen: CenterPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => {
                const color = focused ? '#ff5959' : '#666';
                return (
                    <Icon name="person-outline" size={20} color={color}></Icon>
                )
            }
        }
    }
}

const TabNavigatorConfig = {
    tabBarOptions: {
        activeTintColor: '#ff5959',
        showIcon: true,
        inactiveTintColor: '#666',
        labelStyle: {
            fontSize: 12,
        }
    }
}
const bottomTabNavigation = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

const mainNavigation = createStackNavigator(
    {
        bottomTab: {
            screen: bottomTabNavigation
        },
        video: {
            screen: VideoPage
        },
        list: {
            screen: ListPage
        },
        register: {
            screen: RegisterPage
        },
        login: {
            screen: LoginPage
        },
        setting: {
            screen: SettingPage
        },
        userInfo: {
            screen: UserInfoPage
        },
        editName: {
            screen: EditNamePage
        }
    },
    {
        headerMode: 'none',
        mode :"mode"
    }
);





export default mainNavigation;