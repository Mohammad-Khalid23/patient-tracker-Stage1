/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './container/app.js'
import { Provider } from 'react-redux'
import store from './store'

import { Container, Header, Content, Tab, Tabs } from 'native-base';
import AddPatient from './components/addPatient.js'
import AllPatient from './components/allPatient.js'
export default class stage1 extends Component {
  render() {
    return (
<Provider store={store}>
  <App/>
</Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('stage1', () => stage1);
