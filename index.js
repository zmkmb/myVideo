/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import myStorage from './js/storage';
global.myStorage = myStorage;

AppRegistry.registerComponent(appName, () => App);
