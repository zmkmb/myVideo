/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import InitNavigation from './js/navigation/InitNavigation';
import { Provider } from 'react-redux';
import store from './js/store';
import myStorage from "./js/storage";
import { upDataUserInfo } from './js/store/action';
import StatusBarPage from "./js/pages/StatuBarPage";
import {
  View,
  Text,
  StatusBar
} from 'react-native';
const App = () => {
  return (
    <Provider store={store}>
      <StatusBarPage />
    </Provider>
  )
};


myStorage.get('user').then((res) => {
  store.dispatch(upDataUserInfo(res));
})



export default App;
